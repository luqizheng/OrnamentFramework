using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using MvcContrib.PortableAreas;
using MvcContrib.UI.InputBuilder.ViewEngine;
using SeajsBundles.Seajs;

namespace Ornament.Web.Controllers
{
    public class OrnamentEmbeddedResourceController : Controller
    {
        public ActionResult Index(string resourceName, string resourcePath)
        {
            if (!string.IsNullOrEmpty(resourcePath))
            {
                resourceName = resourcePath + "." + resourceName;
            }

            var areaName = (string) RouteData.DataTokens["area"];

            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            // pre-pend "~" so that it will be replaced with assembly namespace
            Stream resourceStream = resourceStore.GetResourceStream(resourceName);
            string path = VirtualPathUtility.ToAppRelative(HttpContext.Request.Url.LocalPath);

            var bundleModule = new RootModule(path, new BundleContext(HttpContext, BundleTable.Bundles, path), true);

            string content = "";
            using (var stream = new StreamReader(resourceStream))
            {
                content = stream.ReadToEnd();
            }

            content = bundleModule.BuildContent(content);

            if (resourceStream == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            string contentType = GetContentType(resourceName);
            return File(new MemoryStream(Encoding.UTF8.GetBytes(content)), contentType);
        }

        #region Private Members

        private static readonly Dictionary<string, string> mimeTypes = InitializeMimeTypes();

        private static string GetContentType(string resourceName)
        {
            string extension = resourceName.Substring(resourceName.LastIndexOf('.')).ToLower();
            return mimeTypes[extension];
        }

        private static Dictionary<string, string> InitializeMimeTypes()
        {
            var mimes = new Dictionary<string, string>
            {
                {".gif", "image/gif"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".js", "text/javascript"},
                {".css", "text/css"},
                {".txt", "text/plain"},
                {".xml", "application/xml"},
                {".zip", "application/zip"}
            };
            return mimes;
        }

        #endregion
    }
}