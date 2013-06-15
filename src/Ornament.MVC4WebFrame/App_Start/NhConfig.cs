using System;
using System.Reflection;
using System.Web.Hosting;
using FluentNHibernate.Cfg;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Ornament.AppStart;
using Ornament.Web;
using Qi.NHibernateExtender;

namespace Ornament.MVCWebFrame.App_Start
{
    public class NhConfig
    {
        public static void Config()
        {
            //Assembly auto config.
            OnStart.Start(OrnamentContext.Configuration, AppDomain.CurrentDomain.GetAssemblies());
            NHConfig();

            UpdateDatabase();
        }

        private static void NHConfig()
        {
            SessionManager.Regist("default", () =>
                {
                    var config = new Configuration();
                    config.Configure(HostingEnvironment.MapPath("~/config/hibernate_mysql.cfg.config"));
                    FluentConfiguration result = Fluently.Configure(config);
                    for (int i = 0; i < OrnamentContext.Configuration.NhibernateCfg.NhAssemblies.Count; i++)
                    {
                        Assembly assembly1 = OrnamentContext.Configuration.NhibernateCfg.NhAssemblies[i];
                        result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly1));
                    }
                    foreach (Type type in OrnamentContext.Configuration.NhibernateCfg.NHTypes)
                    {
                        Type type1 = type;
                        result.Mappings(s => s.FluentMappings.Add(type1));
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