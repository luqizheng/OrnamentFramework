using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using FluentNHibernate.Cfg;
using Qi;
using Qi.NHibernateExtender;
using Configuration = NHibernate.Cfg.Configuration;

namespace Ornament.Configurations
{
    public class NHConfig
    {
        private readonly IDictionary<Type, Type>
            _regType = new Dictionary<Type, Type>();

        public bool BuildHBMFile { get; set; }

        public string ExportHbmFolder { get; set; }

        public void AddFactoryDao(Type interfaceType, Type impleType)
        {
            if (_regType.ContainsKey(interfaceType))
            {
                return;
            }
            _regType.Add(interfaceType, impleType);
        }

        private IEnumerable<Assembly> GetFluenAssembly()
        {
            var fluentAssembliesSet = new HashSet<Assembly>();
            foreach (Type fluentAssembly in _regType.Values)
            {
                fluentAssembliesSet.Add(fluentAssembly.Assembly);
            }
            return fluentAssembliesSet.ToArray();
        }

        private IEnumerable<Assembly> GetHBMXmlFile()
        {
            var fluentAssembliesSet = new HashSet<Assembly>();
            foreach (Type assembly in _regType.Keys)
            {
                fluentAssembliesSet.Add(assembly.Assembly);
            }
            return fluentAssembliesSet.ToArray();
        }

        /// <summary>
        ///     Reg to Assembly
        /// </summary>
        public void Regist()
        {
            IEnumerable<Assembly> fluentAssemblies = GetFluenAssembly();
            IEnumerable<Assembly> nhAssembilies = GetHBMXmlFile();
            foreach (var type in _regType.Keys)
            {
                OrnamentContext.DaoFactory.Regist(type, _regType[type]);
            }
            SessionManager.Regist("default", () =>
            {
                var config = new Configuration();
                string configFileName = ConfigurationManager.AppSettings["nhConfig"];
                config.Configure(ApplicationHelper.MapPath(configFileName));
                FluentConfiguration result = Fluently.Configure(config);


                foreach (Assembly assembly in fluentAssemblies)
                {
                    if (BuildHBMFile)
                    {
                        Assembly assembly1 = assembly;
                        result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly1)
                            .ExportTo(ExportHbmFolder));
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