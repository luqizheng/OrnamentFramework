using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Runtime.Caching;
using System.Web.Mvc;
using MvcContrib.PortableAreas;
using MvcContrib.UI.InputBuilder.ViewEngine;

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

            ViewContext a = htmlHelper.ViewContext;
            return GetEmbededResourceString(a, viewName, key);
        }

        public static string GetFromatResourceString(this HtmlHelper htmlHelper, string key,
                                                     params object[] varibalValue)
        {
            return String.Format(GetEmbededResourceString(htmlHelper, key), varibalValue);
        }

        /* private static IEnumerable<DictionaryEntry> GetResx(string resxKey, string areaName)
         {
             ObjectCache cache = MemoryCache.Default;

             IEnumerable<DictionaryEntry> resxs = null;

             if (cache.Contains(resxKey))
             {
                 resxs = cache.GetCacheItem(resxKey).Value as IEnumerable<DictionaryEntry>;
             }
             else
             {
                 if (File.Exists(resxKey))
                 {
                     resxs = new ResXResourceReader(resxKey).Cast<DictionaryEntry>();
                     cache.Add(resxKey, resxs, new CacheItemPolicy { Priority = CacheItemPriority.NotRemovable });
                 }
                 else if (!String.IsNullOrEmpty(areaName))
                 {
                     AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
                     resxKey=resxKey.Replace("\\",".").
                     // pre-pend "~" so that it will be replaced with assembly namespace
                     Stream resourceStream = resourceStore.GetResourceStream(resxKey);
                 }
             }

             return resxs;
         }*/

        public static string GetEmbededResourceString(this ViewContext page, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView)page.View).ViewPath;
            string pageName = GetFileNameWithoutExtension(pagePath);
            return GetEmbededResourceString(page, pageName, key);
        }

        public static string GetEmbededResourceString(this ViewContext page, string viewName, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView)page.View).ViewPath;
            string pageName = viewName;
            string filePath = pagePath.Substring(0, pagePath.LastIndexOf('/') + 1) + "App_LocalResources";

            var resxs = GetPath(page, filePath, pageName);

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
            var areaName = (string)page.RouteData.DataTokens["area"];
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);

            string defaultReex = resourceStore.GetFullyQualifiedTypeFromPath(string.Format(@"{0}/{1}.resources", filePath, pageName));
            var stream = resourceStore.GetResourceStream(defaultReex);
            if (stream == null)
                return null;
            try
            {
                ResourceSet reader = new ResourceSet(new ResourceReader(stream));

                return reader;


            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}