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
        private readonly Queue<JsModule> _jsEmbeddedModulePath = new Queue<JsModule>();

        public AreaRegistrationHelper(BasePortableAreaRegistration protablAreaRegistration)
        {
            if (protablAreaRegistration == null)
            {
                throw new ArgumentNullException("protablAreaRegistration");
            }
        }

        public void RegistJsModule(string path)
        {
            var item = new JsModule(path);
            _jsEmbeddedModulePath.Enqueue(item);
        }

        public void SendAllMessage(AreaRegistrationContext context, IApplicationBus bus)
        {
            while (_jsEmbeddedModulePath.Count != 0)
            {
                var model = _jsEmbeddedModulePath.Dequeue();
                var bundlePrefix = string.Format("{0}/{1}", context.AreaName, model.BundleName);
                var jsFiles =
                    AssemblyResourceManager.GetResourceStoreForArea(context.AreaName)
                        .MatchPath("~/" + model.FilePath, ".js");
                if ((jsFiles == null) || (jsFiles.Length == 0))
                {
                    throw new FileNotFoundException(string.Format("Not found an embed js file in {0}", bundlePrefix));
                }
                foreach (var jsFile in jsFiles)
                {
                    var bundle = model.CreateBundle(context, jsFile);
                    var eventMessage = new RequireJsModuleBundleEventMessage(bundle);
                    bus.Send(eventMessage);
                }
            }
        }

        private class JsModule
        {
            public JsModule(string filePath)
            {
                FilePath = filePath.TrimStart('/', '~', ' ').TrimEnd(' ', '/');
                BundleName = FilePath.TrimStart('/', '~', ' ').TrimEnd(' ', '/');
                if (BundleName.EndsWith(".js"))
                {
                    BundleName = BundleName.Substring(0, filePath.Length - 3);
                }
            }

            /// <summary>
            /// </summary>
            public string BundleName { get; private set; }

            public string FilePath { get; private set; }

            public EmbedBundle CreateBundle(AreaRegistrationContext context, string file)
            {
                var bundleFile = file;
                if (bundleFile.EndsWith(".js"))
                {
                    bundleFile = bundleFile.Substring(0, file.Length - 3);
                }

                var bundleName = string.Format("~/{0}/{1}/{2}", context.AreaName, BundleName, bundleFile);
                var virtualPath = string.Format("~/areas/{0}/{1}/{2}", context.AreaName, FilePath, file);

                var result = new EmbedBundle(bundleName, context.AreaName);
                result.Include(virtualPath);
                return result;
            }
        }
    }
}