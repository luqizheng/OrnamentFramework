using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
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
    }
}
