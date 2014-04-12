namespace Ornament.Web
{
    using Ornament;
    using Ornament.Web.Messages;
    using Ornament.Web.PortableAreas;
    using Ornament.Web.SeajsModules;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Runtime.CompilerServices;
    using System.Web.Mvc;

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
            this._protablAreaRegistration = protablAreaRegistration;
            this._context = context;
            protablAreaRegistration.EmbedResourceRegisted += new EventHandler<RegistedEmbedresourceEventArgs>(this.protablAreaRegistration_RegistedEmbedResource);
        }

        private void protablAreaRegistration_RegistedEmbedResource(object sender, RegistedEmbedresourceEventArgs e)
        {
            this.ResgistSeajsFiles(e.Bus);
            ((PortableAreaRegistration)sender).EmbedResourceRegisted -= new EventHandler<RegistedEmbedresourceEventArgs>(this.protablAreaRegistration_RegistedEmbedResource);
        }

        public void RegistryDefault()
        {
            this.RegistSeajsModule("Scripts");
        }

        public void RegistryImages(string imageFolder)
        {
            if (imageFolder == null)
            {
                throw new ArgumentNullException("imageFolder");
            }
            imageFolder = imageFolder.Trim(new char[] { '/', ' ' });
            this.RegistyEmbedResouce(imageFolder);
        }

        public void RegistScripts(string scriptPath)
        {
            if (scriptPath == null)
            {
                throw new ArgumentNullException("scriptPath");
            }
            scriptPath = scriptPath.Trim(new char[] { '/', ' ', '~' });
            this.RegistyEmbedResouce(scriptPath);
        }

        public void RegistSeajsModule(string path)
        {
            SeajsModel item = new SeajsModel(path, path);
            this._seajsEmbeddedModulePath.Add(item);
        }

        public void RegistSeajsModule(string bundlePath, string virtualPath)
        {
            SeajsModel item = new SeajsModel(bundlePath, virtualPath);
            this._seajsEmbeddedModulePath.Add(item);
        }

        public void RegistyEmbedResouce(string path)
        {
            if (path == null)
            {
                throw new ArgumentNullException("path");
            }
            path = path.Trim(new char[] { '/', ' ' });
            this._context.MapRoute(this._protablAreaRegistration.AreaName + "_" + path + "_embededResource", string.Format("{0}/{1}/{{resourceName}}", this._protablAreaRegistration.AreaRoutePrefix, path), new { controller = "EmbeddedResource", action = "Index", resourcePath = path }, new string[] { "Ornament.Web.Controllers" });
        }

        protected void ResgistSeajsFiles(IApplicationBus bus)
        {
            foreach (SeajsModel model in this._seajsEmbeddedModulePath)
            {
                string str = string.Format("{0}/{1}", this._context.AreaName, model.BundleNamee);
                string[] strArray = AssemblyResourceManager.GetResourceStoreForArea(this._context.AreaName).MatchPath("~/" + model.FilePath, ".js");
                if ((strArray == null) || (strArray.Length == 0))
                {
                    throw new FileNotFoundException(string.Format("Not found an embed js file in {0}", str));
                }
                foreach (string str2 in strArray)
                {
                    SeajsEmbedBundle bundle = new SeajsEmbedBundle(string.Format("~/{0}/{1}", str, str2), this._context.AreaName, OrnamentContext.Configuration.GetSeajsCombine());
                    if (model.BundleNamee != model.FilePath)
                    {
                        string virtualPath = string.Format("~/areas/{0}/{1}/{2}", this._context.AreaName, model.FilePath, str2);
                        bundle.Include(virtualPath);
                    }
                    SeajsModuleBundleEventMessage eventMessage = new SeajsModuleBundleEventMessage(bundle);
                    bus.Send(eventMessage);
                }
            }
        }

        private class SeajsModel
        {
            public SeajsModel(string bundleNamee, string filePath)
            {
                this.BundleNamee = bundleNamee.TrimStart(new char[] { '/', '~', ' ' }).TrimEnd(new char[] { ' ' });
                this.FilePath = filePath.TrimStart(new char[] { '/', '~', ' ' }).TrimEnd(new char[] { ' ' });
            }

            public string BundleNamee { get; private set; }

            public string FilePath { get; private set; }
        }
    }
}

