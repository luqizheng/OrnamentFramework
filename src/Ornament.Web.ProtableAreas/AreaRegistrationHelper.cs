using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;
using SeajsBundles;

namespace Ornament.Web
{
    public class AreaRegistrationHelper
    {
        private readonly string _assemblyRootNamespace;
        private readonly AreaRegistrationContext _context;
        private readonly PortableAreaRegistration _protablAreaRegistration;
        private readonly IList<SeajsEmbedName> _seajsEmbeddedModulePath = new List<SeajsEmbedName>();

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

            imageFolder = imageFolder.Trim('/', ' ');
            RegistyEmbedResouce(imageFolder);
        }

        /// <summary>
        /// </summary>
        /// <param name="scriptPath"></param>
        public void RegistScripts(string scriptPath)
        {
            if (scriptPath == null)
                throw new ArgumentNullException("scriptPath");
            scriptPath = scriptPath.Trim('/', ' ', '~');
            RegistyEmbedResouce(scriptPath);
        }

        public void RegistyEmbedResouce(string path)
        {
            if (path == null)
                throw new ArgumentNullException("path");
            path = path.Trim('/', ' ');
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


        /// <summary>
        /// </summary>
        /// <param name="assemblyFolderPath">From the root name.</param>
        public void RegistySeajsModule(string assemblyFolderPath)
        {
            var assembly = new SeajsEmbedName(assemblyFolderPath);
            _seajsEmbeddedModulePath.Add(assembly);
        }

        public void RegistySeajsModule(string assemblyFolderPath, string bundleName)
        {
            var assembly = new SeajsEmbedName(assemblyFolderPath, bundleName);
            _seajsEmbeddedModulePath.Add(assembly);
        }


        protected void ResgistSeajsFiles(IApplicationBus bus)
        {
            foreach (SeajsEmbedName seajsEmbedInfo in _seajsEmbeddedModulePath)
            {
                string virtualPath = string.Format("{0}/{1}", _context.AreaName, seajsEmbedInfo.VirtualFolder);
                string namespacePath = string.Format("{0}.{1}", _assemblyRootNamespace, seajsEmbedInfo.AssemblyFolder);
                string embedVirtualPath = String.Format("~/{1}/{0}", seajsEmbedInfo.AssemblyFolder, _context.AreaName);

                AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(_context.AreaName);
                string[] files = resourceStore.MatchPath(namespacePath.Replace("/", "."), ".js");
                if (files == null || files.Length == 0)
                    throw new FileNotFoundException(String.Format("Not found an embed js file in {0}", namespacePath));
                foreach (string file in files)
                {
                    string fileVietualPath = string.Format("~/{0}/{1}", virtualPath, file);
                    string assemblyFilePath = string.Format("{0}/{1}", embedVirtualPath, file);

                    var bundle = new SeajsEmbedBundle(fileVietualPath,
                        _assemblyRootNamespace,
                        _context.AreaName,
                        OrnamentContext.Configuration.GetSeajsCombine()
                        );
                    bundle.Include(assemblyFilePath);

                    var message = new SeajsModuleBundleEventMessage(bundle);
                    bus.Send(message);
                }
            }
        }

        private class SeajsEmbedName
        {
            public SeajsEmbedName(string embededAssemblyFilePath)
                : this(embededAssemblyFilePath, embededAssemblyFilePath)
            {
            }

            public SeajsEmbedName(string embededAssemblyFilePath, string virtualPath)
            {
                AssemblyFolder = embededAssemblyFilePath.Trim('~', ' ', '/');
                VirtualFolder = virtualPath.Trim('~', ' ', '/');
            }

            public string AssemblyFolder { get; private set; }
            public string VirtualFolder { get; private set; }
        }
    }
}