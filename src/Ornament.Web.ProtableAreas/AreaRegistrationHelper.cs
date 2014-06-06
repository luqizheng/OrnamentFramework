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
        private readonly AreaRegistrationContext _context;
        private readonly PortableAreaRegistration _protablAreaRegistration;
        private readonly IList<SeajsModel> _seajsEmbeddedModulePath = new List<SeajsModel>();

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
            ((PortableAreaRegistration) sender).EmbedResourceRegisted -= protablAreaRegistration_RegistedEmbedResource;
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
            imageFolder = imageFolder.Trim(new[] {'/', ' '});
            RegistyEmbedResouce(imageFolder);
        }

        public void RegistScripts(string scriptPath)
        {
            if (scriptPath == null)
            {
                throw new ArgumentNullException("scriptPath");
            }
            scriptPath = scriptPath.Trim(new[] {'/', ' ', '~'});
            RegistyEmbedResouce(scriptPath);
        }

        public void RegistSeajsModule(string path)
        {
            var item = new SeajsModel(path, path);
            _seajsEmbeddedModulePath.Add(item);
        }

        public void RegistSeajsModule(string bundlePath, string virtualPath)
        {
            var item = new SeajsModel(bundlePath, virtualPath);
            _seajsEmbeddedModulePath.Add(item);
        }

        /// <summary>
        ///     注册内嵌资源，如图片等，请注意，Mapping的时候，
        ///     要主要必须在其他Route 注册之前，最好是第一个注册项目。
        /// </summary>
        /// <param name="path"></param>
        public void RegistyEmbedResouce(string path)
        {
            if (path == null)
            {
                throw new ArgumentNullException("path");
            }
            path = path.Trim(new[] {'/', ' '});
            _context.MapRoute(_protablAreaRegistration.AreaName + "_" + path.Replace("/", "_") + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new {controller = "EmbeddedResource", action = "Index", resourcePath = path},
                new[] {"Ornament.Web.Controllers"});
        }

        protected void ResgistSeajsFiles(IApplicationBus bus)
        {
            foreach (SeajsModel model in _seajsEmbeddedModulePath)
            {
                string str = string.Format("{0}/{1}", _context.AreaName, model.BundleNamee);
                string[] strArray =
                    AssemblyResourceManager.GetResourceStoreForArea(_context.AreaName)
                        .MatchPath("~/" + model.FilePath, ".js");
                if ((strArray == null) || (strArray.Length == 0))
                {
                    throw new FileNotFoundException(string.Format("Not found an embed js file in {0}", str));
                }
                foreach (string str2 in strArray)
                {
                    var bundle = new SeajsEmbedBundle(string.Format("~/{0}/{1}", str, str2), _context.AreaName,
                        OrnamentContext.Configuration.GetSeajsCombine());
                    if (model.BundleNamee != model.FilePath)
                    {
                        string virtualPath = string.Format("~/areas/{0}/{1}/{2}", _context.AreaName, model.FilePath,
                            str2);
                        bundle.Include(virtualPath);
                    }
                    var eventMessage = new SeajsModuleBundleEventMessage(bundle);
                    bus.Send(eventMessage);
                }
            }
        }

        private class SeajsModel
        {
            public SeajsModel(string bundleNamee, string filePath)
            {
                BundleNamee = bundleNamee.TrimStart(new[] {'/', '~', ' '}).TrimEnd(new[] {' ', '/'});
                FilePath = filePath.TrimStart(new[] {'/', '~', ' '}).TrimEnd(new[] {' ', '/'});
            }

            public string BundleNamee { get; private set; }

            public string FilePath { get; private set; }
        }
    }
}