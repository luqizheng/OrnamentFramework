using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Ornament.Web.Messages;
using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

namespace Ornament.Web
{
    public class AreaRegistrationHelper
    {
        // Fields
        private readonly AreaRegistrationContext _context;
        private readonly PortableAreaRegistration _protablAreaRegistration;
        private readonly IList<SeajsModel> _seajsEmbeddedModulePath = new List<SeajsModel>();

        // Methods
        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration, AreaRegistrationContext context)
        {
            if (protablAreaRegistration == null)
            {
                throw new ArgumentNullException("protablAreaRegistration");
            }
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }
            _protablAreaRegistration = protablAreaRegistration;
            _context = context;
            protablAreaRegistration.EmbedResourceRegisted += protablAreaRegistration_RegistedEmbedResource;
        }

        private void protablAreaRegistration_RegistedEmbedResource(object sender, RegistedEmbedresourceEventArgs e)
        {
            ResgistSeajsFiles(e.Bus);
            ((PortableAreaRegistration)sender).EmbedResourceRegisted -= protablAreaRegistration_RegistedEmbedResource;
        }

        public void RegistryDefault()
        {
            RegistSeajsModule("Scripts");
        }

        public void RegistryImages(string imageFolder)
        {
            if (imageFolder == null)
            {
                throw new ArgumentNullException("imageFolder");
            }
            imageFolder = imageFolder.Trim(new[] { '/', ' ' });
            RegistyEmbedResouce(imageFolder);
        }

        public void RegistScripts(string scriptPath)
        {
            if (scriptPath == null)
            {
                throw new ArgumentNullException("scriptPath");
            }
            scriptPath = scriptPath.Trim(new[] { '/', ' ', '~' });
            RegistyEmbedResouce(scriptPath);
        }

        public void RegistSeajsModule(string path)
        {
            var seajsModule = new SeajsModel(path, path);
            _seajsEmbeddedModulePath.Add(seajsModule);
        }

        public void RegistSeajsModule(string bundlePath, string virtualPath)
        {
            var seajsModule = new SeajsModel(bundlePath, virtualPath);
            _seajsEmbeddedModulePath.Add(seajsModule);
        }

        public void RegistyEmbedResouce(string path)
        {
            if (path == null)
            {
                throw new ArgumentNullException("path");
            }
            path = path.Trim(new[] { '/', ' ' });
            _context.MapRoute(_protablAreaRegistration.AreaName + "_" + path + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new { controller = "EmbeddedResource", action = "Index", resourcePath = path },
                new[] { "Ornament.Web.Controllers" });
        }

        protected void ResgistSeajsFiles(IApplicationBus bus)
        {
            foreach (SeajsModel path in _seajsEmbeddedModulePath)
            {
                string virtualPath = string.Format("{0}/{1}", _context.AreaName, path.BundleNamee);
                string[] files =
                    AssemblyResourceManager.GetResourceStoreForArea(_context.AreaName)
                        .MatchPath("~/" + path.FilePath, ".js");
                if ((files == null) || (files.Length == 0))
                {
                    throw new FileNotFoundException(string.Format("Not found an embed js file in {0}", virtualPath));
                }
                foreach (string file in files)
                {
                    var bundle = new SeajsEmbedBundle(string.Format("~/{0}/{1}", virtualPath, file), _context.AreaName,
                        OrnamentContext.Configuration.GetSeajsCombine());

                    string filePath = string.Format("~/areas/{0}/{1}/{2}", _context.AreaName, path.FilePath, file);
                    bundle.Include(filePath);

                    var message = new SeajsModuleBundleEventMessage(bundle);
                    bus.Send(message);
                }
            }
        }

        // Nested Types
        private class SeajsModel
        {
            // Methods
            public SeajsModel(string bundleNamee, string filePath)
            {
                BundleNamee = bundleNamee.TrimStart(new[] { '/', '~', ' ' }).TrimEnd(new[] { ' ' });
                FilePath = filePath.TrimStart(new[] { '/', '~', ' ' }).TrimEnd(new[] { ' ' });
            }

            // Properties
            public string BundleNamee { get; private set; }

            public string FilePath { get; private set; }
        }
    }
}