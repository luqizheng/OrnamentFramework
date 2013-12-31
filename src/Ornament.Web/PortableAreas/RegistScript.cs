using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Ornament.Web.PortableAreas
{
    public class EmbeddedHelper
    {
        private readonly PortableAreaRegistration _protablAreaRegistration;


        public EmbeddedHelper(PortableAreaRegistration protablAreaRegistration)
        {
            _protablAreaRegistration = protablAreaRegistration;
        }

        public void RegistyScripts(string scriptName, AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                _protablAreaRegistration.AreaName + "_" + scriptName + "_scripts",
                string.Format("{0}/Scripts/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, scriptName),
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