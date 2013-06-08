﻿using System;
using System.Reflection;
using System.Web.Hosting;
using System.Web.Security;
using FluentNHibernate.Cfg;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Ornament.AppStart;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.Web;
using Ornament.Web.Models;
using Qi.NHibernateExtender;
using log4net;

namespace Ornament.MVCWebFrame.App_Start
{
    public class NhConfig
    {
        public static void Config()
        {
            //Assembly auto config.
            OnStart.Start(OrnamentContext.Current, AppDomain.CurrentDomain.GetAssemblies());

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
                for (int i = 0; i < OrnamentContext.Current.NhAssemblies.Count; i++)
                {
                    Assembly assembly1 = OrnamentContext.Current.NhAssemblies[i];
                    result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly1));
                }
                foreach (Type type in OrnamentContext.Current.NHTypes)
                {
                    Type type1 = type;
                    result.Mappings(s => s.FluentMappings.Add(type1));
                }

                return result.BuildConfiguration();
            });
        }

        private static void UpdateDatabase()
        {
            try
            {
                //Update db 
                MembershipContext.Provider = Membership.Provider as IMemberShipProvider;
                var init = (new GlobalInitializer());
                init.UpdateAllSturcture();
                var initMemberShip = GlobalInitializer.GetContainer().Resolve<IDataInitializer>("MembershipInit");
                if (initMemberShip.IsFirstApplicationStart)
                {
                    initMemberShip.CreateData();
                }
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof(NhConfig)).Error("global fails.", ex);
            }
        }
    }
}