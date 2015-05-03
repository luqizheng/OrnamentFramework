using System;
using System.Collections;
using System.Linq;
using System.Web.Caching;
using System.Web.Hosting;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.InputBuilder.ViewEngine
{
    public class AssemblyResourceProvider : VirtualPathProvider
    {
        private bool IsCrosssAssemblyPath(string virtualPath, out string newPath)
        {
            int pos = virtualPath.LastIndexOf("~", StringComparison.Ordinal);

            bool result = pos != -1 && pos != 0;
            newPath = result ? virtualPath.Substring(pos) : null;
            return result;
        }

        public override bool FileExists(string virtualPath)
        {
            string newPath = null;
            bool virpath = IsCrosssAssemblyPath(virtualPath, out newPath);
            if (virpath)
            {
                virtualPath = newPath;
            }

            bool flag = base.FileExists(virtualPath);
            if (!flag)
            {
                string checkPath = GetTheEmbedPath(virtualPath);
                return AssemblyResourceManager.IsEmbeddedViewResourcePath(checkPath);
            }
            return flag;
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies,
            DateTime utcStart)
        {
            foreach (object obj2 in virtualPathDependencies)
            {
                string checkpath = GetTheEmbedPath(obj2.ToString());

                if (AssemblyResourceManager.IsEmbeddedViewResourcePath(checkpath))
                {
                    return null;
                }
            }
            string[] strArray = (from s in virtualPathDependencies.OfType<string>()
                //where !s.ToLower().Contains("/views/inputbuilders")
                select s).ToArray<string>();
            return base.GetCacheDependency(virtualPath, strArray, utcStart);
        }

        public override string GetCacheKey(string virtualPath)
        {
            string checkPath = GetTheEmbedPath(virtualPath);
            if (AssemblyResourceManager.IsEmbeddedViewResourcePath(checkPath))
            {
                return null;
            }
            return base.GetCacheKey(virtualPath);
        }

        private string GetTheEmbedPath(string virtualPath)
        {
            string newPath = null;
            string checkPath = virtualPath;
            if (IsCrosssAssemblyPath(virtualPath, out newPath))
                // 不是夸Assembly获取embed 资源,也就是一个 A Assembly 从 获取BAssembly中的内嵌资源
            {
                checkPath = newPath;
            }
            return checkPath;
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            string str;
            string embedPath = virtualPath;
            if (IsCrosssAssemblyPath(embedPath, out str))
            {
                embedPath = str;
            }
            AssemblyResourceStore assemblyStore = AssemblyResourceManager.GetResourceStoreFromVirtualPath(embedPath);
            if (assemblyStore != null)
            {
                if (embedPath == virtualPath)
                {
                    return new AssemblyResourceVirtualFile(virtualPath, assemblyStore);
                }
                return new AssemblyResourceVirtualFile(virtualPath, assemblyStore, embedPath);
            }
            return base.GetFile(virtualPath);
        }
    }
}