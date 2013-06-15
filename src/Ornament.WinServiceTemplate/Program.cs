using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using log4net.Config;

namespace Ornament.WinServiceTemplate
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            IniLogger();
            InitDao();
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
			{ 
				new OrnamentService() 
			};
            ServiceBase.Run(ServicesToRun);
        }

        private static void IniLogger()
        {
            var settingfile = System.Configuration.ConfigurationManager.AppSettings["log4net"] ?? "log4net.config";
            var file = Qi.ApplicationHelper.MapPath(settingfile);
            XmlConfigurator.ConfigureAndWatch(new FileInfo(file));
        }

        private static void InitDao()
        {
            var dao = new Dictionary<Type, Type>
                {
                    {typeof (IMemberShipFactory), typeof (MemberShipFactory)},
                    {typeof (IMessageDaoFactory), typeof (MessageDaoFactory)}
                };
            foreach (Type key in dao.Keys)
            {
                OrnamentContext.DaoFactory.Regist(key, dao[key]);
            }
        }
    }
}
