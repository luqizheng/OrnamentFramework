using System;
using Castle.Windsor;
using Castle.Windsor.Configuration.Interpreters;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Qi;
using Qi.NHibernate;

namespace Ornament.Web.Models
{
    public class GlobalInitializer
    {
        private const string LoggerName = "Initializer";

        /// <summary>
        /// 获取说有website的初始化器，但是并不包括MembershipInit
        /// </summary>
        public static IDataInitializer[] AllDataInitializers
        {
            get
            {
                using (WindsorContainer container = GetContainer())
                {
                    return container.ResolveAll<IDataInitializer>();
                }
            }
        }

        public static WindsorContainer GetContainer()
        {
            return new WindsorContainer(new XmlInterpreter(ApplicationHelper.MapPath("~/Config/initData.config")));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sessionFactoryName"></param>
        public void UpdateStructure(string sessionFactoryName)
        {
            try
            {
                Configuration config = NhConfigManager.GetNhConfig(sessionFactoryName).NHConfiguration;
                var cc = new SchemaUpdate(config);
                cc.Execute(true, true);
            }
            catch (Exception ex)
            {
                throw new OrnamentException("Init " + sessionFactoryName + " fail, so the website can't be run. ", ex);
            }
        }

        /// <summary>
        /// Update all database structure.
        /// </summary>
        public void UpdateAllSturcture()
        {
            foreach (string sessionFactory in NhConfigManager.SessionFactoryNames)
            {
                UpdateStructure(sessionFactory);
            }
        }

        public void RecreateStructure(string sessionFactoryName)
        {
            if (sessionFactoryName == null)
                throw new ArgumentNullException("sessionFactoryName");
            Configuration nhConfiguration = NhConfigManager.GetNhConfig(sessionFactoryName).NHConfiguration;
            var cc = new SchemaExport(nhConfiguration);
            cc.Drop(true, true);
            cc.Create(true, true);
        }

        /// <summary>
        /// Drop all table and recreate them.
        /// </summary>
        public void RecreateAllSturcture()
        {
            foreach (string sessionFactory in NhConfigManager.SessionFactoryNames)
            {
                RecreateStructure(sessionFactory);
            }
        }

        public void BuildData()
        {
            foreach (var init in AllDataInitializers)
            {
                init.CreateData();
            }
        }
    }
}