using System.Web.Mvc;

namespace Ornament.Web.PortableAreas
{
    public class AreaRegistrationHelper
    {
        private readonly PortableAreaRegistration _protablAreaRegistration;


        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration)
        {
            _protablAreaRegistration = protablAreaRegistration;
        }

        public void RegistryImages(string imageFolder, AreaRegistrationContext context)
        {
            context.MapRoute(
                _protablAreaRegistration.AreaName + imageFolder.Replace("/","_"),
                _protablAreaRegistration.AreaRoutePrefix + "/" + imageFolder + "/{resourceName}",
                new { controller = "EmbeddedResource", action = "Index", resourcePath = "images" },
                new[] { "Ornament.Web.Controllers" }
                );
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
                new[] { "Ornament.Web.Controllers" }
                );
        }
    }
}