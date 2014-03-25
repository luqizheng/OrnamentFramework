using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Optimization;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

namespace Ornament.Web
{
    public class AreaRegistrationHelper
    {
        private readonly string _assemblyRootNamespace;
        private readonly AreaRegistrationContext _context;
        private readonly PortableAreaRegistration _protablAreaRegistration;
        private readonly IList<string> _seajsEmbeddedModulePath = new List<string>();

        /// <summary>
        /// </summary>
        /// <param name="protablAreaRegistration"></param>
        /// <param name="assemblyRootNamespace">root namespace in Assembly</param>
        /// <param name="context"></param>
        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration, string assemblyRootNamespace,
            AreaRegistrationContext context)
        {
            if (protablAreaRegistration == null)
                throw new ArgumentNullException("protablAreaRegistration");
            if (assemblyRootNamespace == null)
                throw new ArgumentNullException("assemblyRootNamespace");
            if (context == null) throw new ArgumentNullException("context");
            _protablAreaRegistration = protablAreaRegistration;
            _assemblyRootNamespace = assemblyRootNamespace.Trim();
            _context = context;
            protablAreaRegistration.EmbedResourceRegisted += protablAreaRegistration_RegistedEmbedResource;
        }

        private void protablAreaRegistration_RegistedEmbedResource(object sender, RegistedEmbedresourceEventArgs e)
        {
            ResgistSeajsFiles(e.Bus);
            ((PortableAreaRegistration)sender).EmbedResourceRegisted -= protablAreaRegistration_RegistedEmbedResource;
        }

        /// <summary>
        ///     注册Default路径，位于根目录下面的 Scripts 、Content/Images
        /// </summary>
        public void RegistryDefault()
        {
            RegistySeajsModule("Scripts");
        }

        public void RegistryImages(string imageFolder)
        {
            if (imageFolder == null)
                throw new ArgumentNullException("imageFolder");
            imageFolder = imageFolder.TrimEnd('/').TrimStart('/');
            RegistyEmbedResouce(imageFolder);
        }

        /// <summary>
        /// </summary>
        /// <param name="scriptPath"></param>
        public void RegistScripts(string scriptPath)
        {
            if (scriptPath == null)
                throw new ArgumentNullException("scriptPath");
            scriptPath = scriptPath.TrimEnd('/').TrimStart('/');
            RegistyEmbedResouce(scriptPath);
        }

        public void RegistyEmbedResouce(string path)
        {
            if (path == null)
                throw new ArgumentNullException("path");
            path = path.TrimStart('/').TrimEnd('/');
            //page scripts  registry
            _context.MapRoute(
                _protablAreaRegistration.AreaName + "_" + path + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new
                {
                    controller = "EmbeddedResource",
                    action = "Index",
                    resourcePath = _assemblyRootNamespace + "." + path,
                }
                ,
                new[] { "Ornament.Web.Controllers" }
                );
        }

        public void RegistySeajsModule(string path)
        {
            _seajsEmbeddedModulePath.Add(path.Trim('/'));
        }

        protected void ResgistSeajsFiles(IApplicationBus bus)
        {
            foreach (string path in _seajsEmbeddedModulePath)
            {
                string virtualPath = string.Format("{0}/{1}", _context.AreaName, path.TrimStart('/'));
                string namespacePath = string.Format("{0}.{1}", _assemblyRootNamespace, path.Replace("/", "."));
                AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(_context.AreaName);
                string[] files = resourceStore.MatchPath(namespacePath, ".js");
                foreach (string file in files)
                {
                    string filePath = string.Format("~/{0}/{1}", virtualPath, file);

                    var bundle = new SeajsEmbedBundle(filePath,
                        _assemblyRootNamespace,
                        _context.AreaName,
                        OrnamentContext.Configuration.GetSeajsCombine()
                        );

                    var message = new SeajsModuleBundleEventMessage(bundle);
                    bus.Send(message);
                }
            }
        }
    }
}