﻿using System.Configuration;
using System.Reflection;
using System.Web.Hosting;
using Badminton.Dao.NhImpl;
using FluentNHibernate;
using FluentNHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Messages.Dao.NHibernateImple;
using Qi.NHibernateExtender;
using Configuration = NHibernate.Cfg.Configuration;

namespace Ornament.MVCWebFrame.App_Start
{
    public class NhConfig
    {
        public static void Config()
        {
            var assemblies = new Assembly[]
                {
                    
                    typeof (UserDao).Assembly,
                    typeof (NotifyMessageDao).Assembly,
                    typeof (BadmintonDaoFactory).Assembly
                };
            NHConfig(assemblies, new Assembly[0]);
            UpdateDatabase();
        }

        private static void NHConfig(Assembly[] fluentAssemblies, Assembly[] nhAssembilies)
        {
            SessionManager.Regist("default", () =>
                {
                    var config = new Configuration();
                    string configFileName = ConfigurationManager.AppSettings["nhConfig"];
                    config.Configure(HostingEnvironment.MapPath(configFileName));
                    FluentConfiguration result = Fluently.Configure(config);

                    // ReSharper disable ForCanBeConvertedToForeach
                    for (int index = 0; index < fluentAssemblies.Length; index++)
                    // ReSharper restore ForCanBeConvertedToForeach
                    {
                        Assembly assembly = fluentAssemblies[index];
                        result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly));
                    }
                    for (int i = 0; i < nhAssembilies.Length; i++)
                    {
                        result.Mappings(s => s.HbmMappings.AddFromAssembly(nhAssembilies[i]));
                    }
                  
                    return result.BuildConfiguration();


                });
        }

        private static void UpdateDatabase()
        {
            foreach (string name in SessionManager.SessionFactoryNames)
            {
                var a = new SchemaUpdate(SessionManager.GetSessionWrapper(name).Configuration);
                a.Execute(true, true);
            }
            InitData.Initialize();
        }
    }
}