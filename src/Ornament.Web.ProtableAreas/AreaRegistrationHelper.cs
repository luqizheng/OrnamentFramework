using System;
using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Ornament.Web
{
    public class AreaRegistrationHelper
    {
        private readonly string _assemblyRootNamespace;
        private readonly AreaRegistrationContext _context;
        private readonly PortableAreaRegistration _protablAreaRegistration;


        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration, string assemblyRootNamespace,
            AreaRegistrationContext context)
        {
            if (protablAreaRegistration == null) throw new ArgumentNullException("protablAreaRegistration");
            if (assemblyRootNamespace == null) throw new ArgumentNullException("assemblyRootNamespace");
            if (context == null) throw new ArgumentNullException("context");
            _protablAreaRegistration = protablAreaRegistration;
            _assemblyRootNamespace = assemblyRootNamespace;
            _context = context;
        }

        /// <summary>
        ///     注册Default路径，位于根目录下面的 Scripts 、Content/Images
        /// </summary>
        public void RegistryDefault()
        {
            RegistySeajsEmbedResource("Scripts");
            RegistySeajsEmbedResource("Content/Images");
        }

        public void RegistryImages(string imageFolder)
        {
            if (imageFolder == null) throw new ArgumentNullException("imageFolder");
            RegistyEmbedResouce(imageFolder);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="scriptPath"></param>
        public void RegistyScripts(string scriptPath)
        {
            if (scriptPath == null) 
                throw new ArgumentNullException("scriptPath");
            RegistySeajsEmbedResource(scriptPath);
        }

        public void RegistyEmbedResouce(string path)
        {
            if (path == null) throw new ArgumentNullException("path");
            //page scripts  registry
            _context.MapRoute(
                _protablAreaRegistration.AreaName + "_" + path + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new
                {
                    controller = "EmbeddedResource",
                    action = "Index",
                    resourcePath = _assemblyRootNamespace + "/" + path,
                }
                ,
                new[] { "Ornament.Web.Controllers" }
                );
        }
        public void RegistySeajsEmbedResource(string path)
        {
            if (path == null) throw new ArgumentNullException("path");
            //page scripts  registry
            _context.MapRoute(
                _protablAreaRegistration.AreaName + "_" + path + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new
                {
                    controller = "SeajsModuleEmbeddedResource",
                    action = "Index",
                    resourcePath = _assemblyRootNamespace + "/" + path,
                } 
                ,
                new[] {"Ornament.Web.Controllers"}
                );
        }
    }
}