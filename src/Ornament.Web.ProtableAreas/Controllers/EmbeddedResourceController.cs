using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.Controllers
{
    public class EmbeddedResourceController : Controller
    {
        public ActionResult Index(string resourceName, string resourcePath)
        {
            if (!string.IsNullOrEmpty(resourcePath))
            {
                resourceName = "~/" + resourcePath + "." + resourceName;
            }

            var areaName = (string) RouteData.DataTokens["area"];
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            // pre-pend "~" so that it will be replaced with assembly namespace

            Stream resourceStream = resourceStore.GetResourceStream(resourceName);


            if (resourceStream == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            string contentType = GetContentType(resourceName);
            return File(resourceStream, contentType);
        }

        #region Private Members

        private static readonly Dictionary<string, string> MimeTypes = InitializeMimeTypes();

        private static string GetContentType(string resourceName)
        {
            string extension = resourceName.Substring(resourceName.LastIndexOf('.')).ToLower();
            return MimeTypes[extension];
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
                {".zip", "application/zip"},
                {".html", "text/html"}
            };
            return mimes;
        }

        #endregion
    }
}