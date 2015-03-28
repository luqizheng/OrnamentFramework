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

        private readonly PortableAreaRegistration _protablAreaRegistration;
        private readonly Queue<JsModule> _jsEmbeddedModulePath = new Queue<JsModule>();
        private readonly Queue<string> _embedPath = new Queue<string>();
        public AreaRegistrationHelper(PortableAreaRegistration protablAreaRegistration)
        {
            if (protablAreaRegistration == null)
            {
                throw new ArgumentNullException("protablAreaRegistration");
            }

            _protablAreaRegistration = protablAreaRegistration;

            //protablAreaRegistration.EmbedResourceRegisted += protablAreaRegistration_RegistedEmbedResource;
        }

        //private void protablAreaRegistration_RegistedEmbedResource(object sender, RegistedEmbedresourceEventArgs e)
        //{
        //    SendAllMessage(e.Context, e.Bus);
        //    ((PortableAreaRegistration)sender).EmbedResourceRegisted -= protablAreaRegistration_RegistedEmbedResource;
        //}

        public void RegistryDefault()
        {
            RegistJsModule("Scripts");
        }

        public void RegistryImages(AreaRegistrationContext context, string imageFolder)
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

        public void RegistJsModule(string path)
        {
            RegistJsModule(path, path);
        }

        public void RegistJsModule(string bundlePath, string virtualPath)
        {
            var item = new JsModule(bundlePath, virtualPath);
            _jsEmbeddedModulePath.Enqueue(item);
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
            path = path.Trim(new[] { '/', ' ' });
            _embedPath.Enqueue(path);
        }

        public void SendAllMessage(AreaRegistrationContext context, IApplicationBus bus)
        {
            while (_jsEmbeddedModulePath.Count != 0)
            {
                var model = _jsEmbeddedModulePath.Dequeue();
                string str = string.Format("{0}/{1}", context.AreaName, model.BundleNamee);
                string[] strArray =
                    AssemblyResourceManager.GetResourceStoreForArea(context.AreaName)
                        .MatchPath("~/" + model.FilePath, ".js");
                if ((strArray == null) || (strArray.Length == 0))
                {
                    throw new FileNotFoundException(string.Format("Not found an embed js file in {0}", str));
                }
                foreach (string str2 in strArray)
                {
                    var bundle = new EmbedBundle(string.Format("~/{0}/{1}", str, str2), context.AreaName);
                    if (model.BundleNamee != model.FilePath)
                    {
                        string virtualPath = string.Format("~/areas/{0}/{1}/{2}", context.AreaName, model.FilePath,
                            str2);
                        bundle.Include(virtualPath);
                    }
                    var eventMessage = new RequireJsModuleBundleEventMessage(bundle);
                    bus.Send(eventMessage);
                }
            }

            while (_embedPath.Count != 0)
            {
                var path = _embedPath.Dequeue();
                context.MapRoute(_protablAreaRegistration.AreaName + "_" + path.Replace("/", "_") + "_embededResource",
                string.Format("{0}/{1}/{{resourceName}}", _protablAreaRegistration.AreaRoutePrefix, path),
                new { controller = "EmbeddedResource", action = "Index", resourcePath = path },
                new[] { "Ornament.Web.Controllers" });
            }
        }

        private class JsModule
        {
            public JsModule(string bundleNamee, string filePath)
            {
                BundleNamee = bundleNamee.TrimStart(new[] { '/', '~', ' ' }).TrimEnd(new[] { ' ', '/' });
                FilePath = filePath.TrimStart(new[] { '/', '~', ' ' }).TrimEnd(new[] { ' ', '/' });
            }

            public string BundleNamee { get; private set; }

            public string FilePath { get; private set; }
        }
    }
}