using System;
using System.IO;
using System.Resources;
using System.Web.Mvc;
using Ornament.Web.PortableAreas;

namespace Ornament.Web
{
    public static class HtmlEmbeddedResource
    {
        public static string GetEmbededResourceString(this HtmlHelper htmlhelper, string key)
        {
            ViewContext a = htmlhelper.ViewContext;
            return GetEmbededResourceString(a, key);
        }

        public static string GetEmbededResourceString(this HtmlHelper htmlHelper, string viewName, string key)
        {
            
            return GetEmbededResourceString(htmlHelper.ViewContext, viewName, key);
        }

        public static string GetFromatResourceString(this HtmlHelper htmlHelper, string key,
                                                     params object[] varibalValue)
        {
            return String.Format(GetEmbededResourceString(htmlHelper, key), varibalValue);
        }

   

        public static string GetEmbededResourceString(this ViewContext page, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView) page.View).ViewPath;
            string pageName = GetFileNameWithoutExtension(pagePath);
            return GetEmbededResourceString(page, pageName, key);
        }

        public static string GetEmbededResourceString(this ViewContext page, string viewName, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView) page.View).ViewPath;
            string pageName = viewName;
            string filePath = pagePath.Substring(0, pagePath.LastIndexOf('/') + 1) + "App_LocalResources";

            ResourceSet resxs = GetPath(page, filePath, pageName);
            if (resxs != null)
            {
                return resxs.GetString(key);
            }
            return key;
        }

        private static string GetFileNameWithoutExtension(string fullPath)
        {
            int start = fullPath.LastIndexOf('/') + 1;
            int end = fullPath.LastIndexOf('.');
            return fullPath.Substring(start, end - start);
        }

        private static ResourceSet GetPath(ViewContext page, string filePath, string pageName)
        {
            var areaName = (string) page.RouteData.DataTokens["area"];
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);

            string defaultReex =
                resourceStore.GetFullyQualifiedTypeFromPath(string.Format(@"{0}/{1}.resources", filePath, pageName));
            return resourceStore.GetMultiLanguageResouce(defaultReex);
            /*if (stream == null)
                return null;
            try
            {
                var reader = new ResourceSet(new ResourceReader(stream));
                
                return reader;
            }
            catch (Exception)
            {
                return null;
            }*/
        }
    }
}