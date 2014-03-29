using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using Qi.NHibernateExtender;

namespace Ornament.Web.DataInitializers
{
    public static class GlobalInitializer
    {
        private const string LoggerName = "Initializer";

        private static List<IDataInitializer> _dataInitializers;

        /// <summary>
        ///     获取说有website的初始化器，但是并不包括MembershipInit
        /// </summary>
        public static List<IDataInitializer> DataInitializers
        {
            get { return _dataInitializers ?? (_dataInitializers = new List<IDataInitializer>()); }
        }

        public static T Get<T>() where T : class
        {
            return
                DataInitializers.Select(dataInitializer => dataInitializer as T)
                    .FirstOrDefault(result => !ReferenceEquals(result, null));
        }

       

        public static void RecreateStructure(string sessionFactoryName)
        {
            if (sessionFactoryName == null)
                throw new ArgumentNullException("sessionFactoryName");
            Configuration nhConfiguration = SessionManager.GetSessionWrapperFactory(sessionFactoryName).Configuration;
            var cc = new SchemaExport(nhConfiguration);
            cc.Drop(true, true);
            cc.Create(true, true);
        }

        /// <summary>
        ///     Drop all table and recreate them.
        /// </summary>
        public static void RecreateAllSturcture()
        {
            foreach (string sessionFactory in SessionManager.SessionFactoryNames)
            {
                RecreateStructure(sessionFactory);
            }
        }

        public static void BuildData()
        {
            foreach (IDataInitializer init in DataInitializers)
            {
                if (init.IsNeedInitialize)
                {
                    init.CreateData();
                }
            }
        }
    }
}