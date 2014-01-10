using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;

namespace Ornament.Web.PortableAreas.InputBuilder.ViewEngine
{
    public class AssemblyResourceProvider : VirtualPathProvider
    {
        private const string EmbededTemplateTag = "~/protableareas/";
        private readonly Dictionary<string, string> embedTempalteCache = new Dictionary<string, string>();

        private bool IsProtableTableTemplate(string virtualPath, out string newPath)
        {
            newPath = null;
            virtualPath = virtualPath.ToLower();
            int areasPosition = virtualPath.IndexOf(EmbededTemplateTag);
            if (areasPosition == -1)
            {
                return false;
            }

            if (embedTempalteCache.ContainsKey(virtualPath))
            {
                newPath = embedTempalteCache[virtualPath];
                return true;
            }

            string template = "";
            if (virtualPath.Contains("editortemplates"))
            {
                template = "/EditorTemplates";
            }
            if (virtualPath.Contains("displaytemplates"))
            {
                template = "/DisplayTemplates";
            }
            string protableAreaPath = virtualPath.Substring(areasPosition);

            string[] d = protableAreaPath.Split(new[] {'/'}, StringSplitOptions.RemoveEmptyEntries);


            newPath = String.Format("~/areas/{0}/Views/Shared{1}/{2}", d[2], template,
                VirtualPathUtility.GetFileName(virtualPath));

            return true;
        }

        public override bool FileExists(string virtualPath)
        {
            bool exists = base.FileExists(virtualPath);

            if (!exists)
            {
                exists = AssemblyResourceManager.IsEmbeddedViewResourcePath(virtualPath);
            }

            if (exists) return true;

            string path = null;

            if (IsProtableTableTemplate(virtualPath, out path))
            {
                bool result = AssemblyResourceManager.IsEmbeddedViewResourcePath(path);
                if (result)
                {
                    lock (embedTempalteCache)
                    {
                        if (!embedTempalteCache.ContainsKey(virtualPath.ToLower()))
                        {
                            embedTempalteCache.Add(virtualPath.ToLower(), path);
                        }
                    }
                }
                return result;
            }
            return false;
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            string path = virtualPath;
            bool isTemplateFolder = embedTempalteCache.ContainsKey(virtualPath.ToLower());
            if (embedTempalteCache.ContainsKey(virtualPath.ToLower()))
            {
                path = embedTempalteCache[virtualPath.ToLower()];
            }

            if (AssemblyResourceManager.IsEmbeddedViewResourcePath(path) && !base.FileExists(path))
            {
                AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreFromVirtualPath(path);
                if (isTemplateFolder)
                    return new AssemblyResourceVirtualFile(virtualPath, resourceStore, path);
                return new AssemblyResourceVirtualFile(virtualPath, resourceStore);
            }


            return base.GetFile(virtualPath);
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies,
            DateTime utcStart)
        {
            if (embedTempalteCache.ContainsKey(virtualPath.ToLower()) ||
                AssemblyResourceManager.IsEmbeddedViewResourcePath(virtualPath))
            {
                return null;
            }
            string[] dependencies =
                virtualPathDependencies.OfType<string>()
                    .Where(s => !s.ToLower().Contains("/views/inputbuilders"))
                    .ToArray();
            return base.GetCacheDependency(virtualPath, dependencies, utcStart);
        }

        public override string GetCacheKey(string virtualPath)
        {
            return null;
        }
    }
}