using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Ornament.Web.PortableArea
{
    public class RegistScriptHelper
    {
        public string AreaName { get; set; }
        public string AreaRoutePrefix { get; set; }

        public RegistScriptHelper(string areaName, string areaRoutePrefix)
        {
            AreaName = areaName;
            AreaRoutePrefix = areaRoutePrefix;
        }

        public void RegistyScripts(string scriptName, AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                AreaName + "_" + scriptName + "_scripts",
                string.Format("{0}/Scripts/{1}/{{resourceName}}", AreaRoutePrefix, scriptName),
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = "Ornament.MemberShip.Plugin.Scripts." + scriptName,
                }
                ,
                new[]
                    {
                        "Ornament.Web.Controllers"
                    }
                );
        }
    }
}
