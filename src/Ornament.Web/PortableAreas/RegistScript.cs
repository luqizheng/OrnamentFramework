using System.Web.Mvc;

namespace Ornament.Web.PortableAreas
{
    public class AreaRegistrationHelper
    {
        private readonly string _assemblyRootNamespace;
        private readonly PortableAreaRegistration _protablAreaRegistration;


        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration, string assemblyRootNamespace)
        {
            _protablAreaRegistration = protablAreaRegistration;
            _assemblyRootNamespace = assemblyRootNamespace;
        }
        /// <summary>
        /// 注册Default路径，位于根目录下面的 Scripts 、Content/Images
        /// </summary>
        /// <param name="context"></param>
        public void RegistryDefault(AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                _protablAreaRegistration.AreaName + "_default_scripts",
                string.Format("{0}/Scripts/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix),
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = this._assemblyRootNamespace+".Scripts",
                }
                ,
                new[] {"Ornament.Web.Controllers"}
                );

            //page scripts  regist
            context.MapRoute(
                _protablAreaRegistration.AreaName + "default_images",
                string.Format("{0}/Scripts/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix),
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = this._assemblyRootNamespace + ".Content.Images",
                }
                ,
                new[] { "Ornament.Web.Controllers" }
                );


        }

        public void RegistryImages(string imageFolder, AreaRegistrationContext context)
        {
            context.MapRoute(
                _protablAreaRegistration.AreaName + imageFolder.Replace("/", "_"),
                _protablAreaRegistration.AreaRoutePrefix + "/" + imageFolder + "/{resourceName}",
                new {controller = "EmbeddedResource", action = "Index", resourcePath = "images"},
                new[] {"Ornament.Web.Controllers"}
                );
        }

        public void RegistyScripts(string scriptPath, AreaRegistrationContext context)
        {
            //page scripts  regist
            context.MapRoute(
                _protablAreaRegistration.AreaName + "_" + scriptPath + "_scripts",
                string.Format("{0}/Scripts/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, scriptPath),
                new
                {
                    controller = "OrnamentEmbeddedResource",
                    action = "Index",
                    resourcePath = _assemblyRootNamespace + "." + scriptPath,
                }
                ,
                new[] {"Ornament.Web.Controllers"}
                );
        }
    }
}