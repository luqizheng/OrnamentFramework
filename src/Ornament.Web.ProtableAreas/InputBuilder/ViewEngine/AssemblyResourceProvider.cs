namespace Ornament.Web.InputBuilder.ViewEngine
{
    using Ornament.Web.PortableAreas;
    using Ornament.Web.PortableAreas.InputBuilder.ViewEngine;
    using System;
    using System.Collections;
    using System.Linq;
    using System.Web.Caching;
    using System.Web.Hosting;

    public class AssemblyResourceProvider : VirtualPathProvider
    {
        public override bool FileExists(string virtualPath)
        {
            bool flag = base.FileExists(virtualPath);
            if (!flag)
            {
                return AssemblyResourceManager.IsEmbeddedViewResourcePath(virtualPath);
            }
            return flag;
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies, DateTime utcStart)
        {
            foreach (object obj2 in virtualPathDependencies)
            {
                if (AssemblyResourceManager.IsEmbeddedViewResourcePath(obj2.ToString()))
                {
                    return null;
                }
            }
            string[] strArray = (from s in virtualPathDependencies.OfType<string>()
                                 where !s.ToLower().Contains("/views/inputbuilders")
                                 select s).ToArray<string>();
            return base.GetCacheDependency(virtualPath, strArray, utcStart);
        }

        public override string GetCacheKey(string virtualPath)
        {
            if (AssemblyResourceManager.IsEmbeddedViewResourcePath(virtualPath))
            {
                return null;
            }
            return base.GetCacheKey(virtualPath);
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            string str = virtualPath;
            if (AssemblyResourceManager.IsEmbeddedViewResourcePath(str))
            {
                return new AssemblyResourceVirtualFile(virtualPath, AssemblyResourceManager.GetResourceStoreFromVirtualPath(str));
            }
            return base.GetFile(virtualPath);
        }
    }
}

