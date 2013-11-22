using System.Collections.Generic;
using System.Web.Mvc;
using MvcContrib.PortableAreas;

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

            var areaName = (string)this.RouteData.DataTokens["area"];
            
            var resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            // pre-pend "~" so that it will be replaced with assembly namespace
            var resourceStream = resourceStore.GetResourceStream(resourceName);

            if (resourceStream == null)
            {
                this.Response.StatusCode = 404;
                return null;
            }

            var contentType = GetContentType(resourceName);
            return this.File(resourceStream, contentType);
        }

        #region Private Members

        private static string GetContentType(string resourceName)
        {
            var extension = resourceName.Substring(resourceName.LastIndexOf('.')).ToLower();
            return mimeTypes[extension];
        }

        private static Dictionary<string, string> mimeTypes = InitializeMimeTypes();

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
