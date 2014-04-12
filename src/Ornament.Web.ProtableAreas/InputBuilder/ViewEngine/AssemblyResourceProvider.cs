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
        bool IsCrosssAssemblyPath(string virtualPath, out string newPath)
        {
            var pos = virtualPath.IndexOf("~");

            var result = pos != -1 && pos != 0;
            newPath = result ? virtualPath.Substring(pos) : null;
            return result;
        }
        public override bool FileExists(string virtualPath)
        {
            bool flag = base.FileExists(virtualPath);
            if (!flag)
            {
                var checkPath = this.GetTheEmbedPath(virtualPath);
                return AssemblyResourceManager.IsEmbeddedViewResourcePath(checkPath);

            }
            return flag;
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies, DateTime utcStart)
        {
            foreach (object obj2 in virtualPathDependencies)
            {
                var checkpath = GetTheEmbedPath(obj2.ToString());

                if (AssemblyResourceManager.IsEmbeddedViewResourcePath(checkpath))
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
            var checkPath = GetTheEmbedPath(virtualPath);
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
            if (IsCrosssAssemblyPath(virtualPath, out newPath)) // 不是夸Assembly获取embed 资源,也就是一个 A Assembly 从 获取BAssembly中的内嵌资源
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
            var assemblyStore = AssemblyResourceManager.GetResourceStoreFromVirtualPath(embedPath);
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

