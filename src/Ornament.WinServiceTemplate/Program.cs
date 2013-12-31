using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.ServiceProcess;
using log4net.Config;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Qi;

namespace Ornament.WinServiceTemplate
{
    internal static class Program
    {
        /// <summary>
        ///     The main entry point for the application.
        /// </summary>
        private static void Main()
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
            string settingfile = ConfigurationManager.AppSettings["log4net"] ?? "log4net.config";
            string file = ApplicationHelper.MapPath(settingfile);
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