using System;
using Castle.Windsor;
using Castle.Windsor.Configuration.Interpreters;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Qi;
using Qi.NHibernateExtender;
using log4net;

namespace Ornament.Web.Models
{
    public class GlobalInitializer
    {
        private const string LoggerName = "Initializer";

        /// <summary>
        ///     获取说有website的初始化器，但是并不包括MembershipInit
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
        /// </summary>
        /// <param name="sessionFactoryName"></param>
        public void UpdateStructure(string sessionFactoryName)
        {
            try
            {
                Configuration config = SessionManager.GetSessionWrapper(sessionFactoryName).Configuration;
                var cc = new SchemaUpdate(config);
                cc.Execute(true, true);
                foreach (Exception a in cc.Exceptions)
                {
                    LogManager.GetLogger(LoggerName).Error(a.Message, a);
                }
            }
            catch (Exception ex)
            {
                throw new OrnamentException("Init " + sessionFactoryName + " fail, so the website can't be run. ", ex);
            }
        }


        /// <summary>
        ///     Update all database structure.
        /// </summary>
        public void UpdateAllSturcture()
        {
            foreach (string sessionFactory in SessionManager.SessionFactoryNames)
            {
                UpdateStructure(sessionFactory);
            }
        }

        public void RecreateStructure(string sessionFactoryName)
        {
            if (sessionFactoryName == null)
                throw new ArgumentNullException("sessionFactoryName");
            Configuration nhConfiguration = SessionManager.GetSessionWrapper(sessionFactoryName).Configuration;
            var cc = new SchemaExport(nhConfiguration);
            cc.Drop(true, true);
            cc.Create(true, true);
        }

        /// <summary>
        ///     Drop all table and recreate them.
        /// </summary>
        public void RecreateAllSturcture()
        {
            foreach (string sessionFactory in SessionManager.SessionFactoryNames)
            {
                RecreateStructure(sessionFactory);
            }
        }

        public void BuildData()
        {
            foreach (IDataInitializer init in AllDataInitializers)
            {
                init.CreateData();
            }
        }
    }
}