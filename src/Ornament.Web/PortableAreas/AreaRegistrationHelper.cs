using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.JsModules;
using Ornament.Web.PortableAreas.Messages;
using Ornament.Web.PortableAreas.PortableAreas;

namespace Ornament.Web.PortableAreas
{
    public class AreaRegistrationHelper
    {
        private readonly Queue<string> _embedPath = new Queue<string>();
        private readonly Queue<JsModule> _jsEmbeddedModulePath = new Queue<JsModule>();
        private readonly BasePortableAreaRegistration _protablAreaRegistration;

        public AreaRegistrationHelper(BasePortableAreaRegistration protablAreaRegistration)
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


        public void RegistJsModule(string path)
        {
            RegistJsModule(path, path);
        }

        public void RegistJsModule(string bundlePath, string virtualPath)
        {
            var item = new JsModule(bundlePath, virtualPath);
            _jsEmbeddedModulePath.Enqueue(item);
        }


        public void SendAllMessage(AreaRegistrationContext context, IApplicationBus bus)
        {
            while (_jsEmbeddedModulePath.Count != 0)
            {
                JsModule model = _jsEmbeddedModulePath.Dequeue();
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
        }

        private class JsModule
        {
            public JsModule(string bundleNamee, string filePath)
            {
                BundleNamee = bundleNamee.TrimStart(new[] {'/', '~', ' '}).TrimEnd(new[] {' ', '/'});
                FilePath = filePath.TrimStart(new[] {'/', '~', ' '}).TrimEnd(new[] {' ', '/'});
            }

            public string BundleNamee { get; private set; }

            public string FilePath { get; private set; }
        }
    }
}