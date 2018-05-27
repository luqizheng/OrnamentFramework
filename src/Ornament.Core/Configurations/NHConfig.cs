using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml;
using FluentNHibernate.Cfg;
using log4net;
using NHibernate.Tool.hbm2ddl;
using Ornament.Properties;
using Qi;
using Qi.NHibernateExtender;
using Configuration = NHibernate.Cfg.Configuration;

namespace Ornament.Configurations
{
    public class NHConfig
    {
        public static NHConfig Instance = new NHConfig();

        private readonly SortedDictionary<string, NHConfigInfo> _regTypes =
            new SortedDictionary<string, NHConfigInfo>();

        private NHConfig()
        {
            
               BuildHBMFile = true;

            string[] configFiles = ConfigurationManager.AppSettings["nhConfig"].Split(';');

            foreach (string configFile in configFiles)
            {
                var dom = new XmlDocument();
                string fullPath = ApplicationHelper.MapPath(configFile);
                dom.Load(fullPath);
                XmlAttribute nameAttr = dom.DocumentElement.ChildNodes[0].Attributes["name"];
                if (nameAttr == null)
                {
                    throw new ConfigurationErrorsException(
                        string.Format(
                            "Please set the nh config file{0} with name attribute which belong to Session-factory element.",
                            configFile));
                }
                _regTypes.Add(nameAttr.Value, new NHConfigInfo(nameAttr.Value, fullPath));
            }
        }
        /// <summary>
        /// 是否输出HBM文件
        /// </summary>
        public bool BuildHBMFile { get; set; }

        public string ExportHbmFolder
        {
            get
            {
                string schemaExportPath = Path.Combine(ApplicationHelper.PhysicalApplicationPath, "Mappings");
                if (!Directory.Exists(schemaExportPath))
                    Directory.CreateDirectory(schemaExportPath);
                return schemaExportPath;
            }
        }

        /// <summary>
        ///     注册Dao
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="impleType"></param>
        public void RegistDaoFactory(Type interfaceType, Type impleType, params string[] sessionFactoryName)
        {
            if (sessionFactoryName != null || sessionFactoryName.Length == 0)
            {
                foreach (string key in _regTypes.Keys)
                {
                    sessionFactoryName = new[] { key };
                    break;
                }
            }

            foreach (string name in sessionFactoryName)
            {
                _regTypes[name].RegistDaoFactory(interfaceType, impleType);
            }
        }


        /// <summary>
        ///     Reg to Assembly
        /// </summary>
        public void Regist()
        {
            foreach (var value in this._regTypes.Values)
            {
                value.Regist(this.BuildHBMFile, this.ExportHbmFolder);
            }
            UpdateDatabase();
        }
        /// <summary>
        /// 更新所有的 database
        /// 
        /// </summary>
        private void UpdateDatabase()
        {
            foreach (string name in SessionManager.SessionFactoryNames)
            {
                var a = new SchemaUpdate(SessionManager.GetSessionWrapperFactory(name).Configuration);
                a.Execute(true, true);
                foreach (Exception exception in a.Exceptions)
                {
                    LogManager.GetLogger(GetType()).Error(exception.Message, exception);
                }
            }
        }

        private class NHConfigInfo
        {
            private readonly IDictionary<Type, Type> _regType = new Dictionary<Type, Type>();

            public NHConfigInfo(string sessionFactoryName, string fullPath)
            {
                SessionFactoryName = sessionFactoryName;
                FilePath = fullPath;
            }

            public string SessionFactoryName { get; private set; }
            public string FilePath { get; private set; }

            private IEnumerable<Assembly> GetFluenAssembly()
            {
                var fluentAssembliesSet = new HashSet<Assembly>();
                foreach (Type fluentAssembly in _regType.Values)
                {
                    fluentAssembliesSet.Add(fluentAssembly.Assembly);
                }
                return fluentAssembliesSet.ToArray();
            }

            private IEnumerable<Assembly> GetHbmXmlFile()
            {
                var fluentAssembliesSet = new HashSet<Assembly>();
                foreach (Type assembly in _regType.Keys)
                {
                    fluentAssembliesSet.Add(assembly.Assembly);
                }
                return fluentAssembliesSet.ToArray();
            }

            /// <summary>
            ///     注册Dao
            /// </summary>
            /// <param name="interfaceType"></param>
            /// <param name="impleType"></param>
            public void RegistDaoFactory(Type interfaceType, Type impleType)
            {
                if (_regType.ContainsKey(interfaceType))
                {
                    return;
                }
                _regType.Add(interfaceType, impleType);
            }

            public void Regist(bool buildHbmFile, string exportHbmFolder)
            {
                IEnumerable<Assembly> fluentAssemblies = GetFluenAssembly();
                IEnumerable<Assembly> nhAssembilies = GetHbmXmlFile();
                foreach (Type type in _regType.Keys)
                {
                    OrnamentContext.DaoFactory.Regist(type, _regType[type]);
                }
                SessionManager.Regist("default", () =>
                {
                    var config = new Configuration();
                    string configFileName = ConfigurationManager.AppSettings["nhConfig"];
                    if (String.IsNullOrEmpty(configFileName))
                        throw new ArgumentNullException(
                            "nhConfig section can't be find in the config file. please set it up in the appSettiong section.");
                    config.Configure(ApplicationHelper.MapPath(configFileName));
                    FluentConfiguration result = Fluently.Configure(config);


                    foreach (Assembly assembly in fluentAssemblies)
                    {
                        if (buildHbmFile)
                        {
                            Assembly assembly1 = assembly;
                            result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly1)
                                .ExportTo(exportHbmFolder));
                        }
                        else
                        {
                            result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly));
                        }
                    }

                    foreach (Assembly assembly in nhAssembilies)
                    {
                        result.Mappings(s => s.HbmMappings.AddFromAssembly(assembly));
                    }

                    return result.BuildConfiguration();
                });
            }
        }
    }
}