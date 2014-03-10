using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Resources;
using System.Runtime.Caching;
using System.Web.Mvc;

namespace Ornament.Web
{
    public static class HtmlResource
    {
        public static string GetResourceString(this HtmlHelper htmlhelper, string key)
        {
            ViewContext a = htmlhelper.ViewContext;
            return GetResourceString(a, key);
        }

        public static string GetResourceString(this HtmlHelper htmlHelper, string viewName, string key)
        {
            ViewContext a = htmlHelper.ViewContext;
            return GetResourceString(a, viewName, key);
        }

        public static string GetFromatResourceString(this HtmlHelper htmlHelper, string key,
            params object[] varibalValue)
        {
            return String.Format(GetResourceString(htmlHelper, key), varibalValue);
        }

        private static IEnumerable<DictionaryEntry> GetResx(string resxKey)
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
                    cache.Add(resxKey, resxs, new CacheItemPolicy {Priority = CacheItemPriority.NotRemovable});
                }
            }

            return resxs;
        }

        public static string GetResourceString(this ViewContext page, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView) page.View).ViewPath;
            string pageName = GetFileNameWithoutExtension(pagePath);
            return GetResourceString(page, pageName, key);
        }

        public static string GetResourceString(this ViewContext page, string viewName, string key)
        {
            var view = page.View as WebFormView;
            string pagePath = view != null ? view.ViewPath : ((RazorView) page.View).ViewPath;
            string pageName = viewName;
            string filePath =
                page.RequestContext.HttpContext.Server.MapPath(pagePath.Substring(0, pagePath.LastIndexOf('/') + 1)) +
                "App_LocalResources";

            IEnumerable<DictionaryEntry> resxs = GetPath(page, filePath, pageName);

            if (resxs != null)
            {
                return (string) resxs.FirstOrDefault(x => x.Key.ToString() == key).Value;
            }
            return key;
        }

        private static string GetFileNameWithoutExtension(string fullPath)
        {
            int start = fullPath.LastIndexOf('/') + 1;
            int end = fullPath.LastIndexOf('.');
            return fullPath.Substring(start, end - start);
        }

        private static IEnumerable<DictionaryEntry> GetPath(ViewContext page, string filePath, string pageName)
        {
            IEnumerable<DictionaryEntry> resxs = null;
            string defaultReex = string.Format(@"{0}\{1}.resx", filePath, pageName);

            string lang = OrnamentContext.MemberShip.CurrentLanguage().Key;
            string resxKey =
                string.IsNullOrWhiteSpace(lang)
                    ? string.Format(@"{0}\{1}.resx", filePath, pageName)
                    : string.Format(@"{0}\{1}.{2}.resx", filePath, pageName, lang);

            resxs = GetResx(resxKey);

            if (resxs != null)
            {
                return resxs;
            }

            return GetResx(defaultReex);
        }
    }
}