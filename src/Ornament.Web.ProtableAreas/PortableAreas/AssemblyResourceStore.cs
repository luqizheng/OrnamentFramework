using System;
using System.Collections.Generic;
using System.IO;
using System.Resources;
using System.Text.RegularExpressions;
using System.Threading;

namespace Ornament.Web.PortableAreas
{
    /// <summary>
    ///     Stores all the embedded resources for a single assembly/area.
    /// </summary>
    public class AssemblyResourceStore
    {
        private PortableAreaMap map;
        private string namespaceName;
        private Dictionary<string, string> resources;
        private Type typeToLocateAssembly;

        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName)
        {
            Initialize(typeToLocateAssembly, virtualPath, namespaceName, null);
        }

        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName,
            PortableAreaMap map)
        {
            Initialize(typeToLocateAssembly, virtualPath, namespaceName, map);
        }

        public string VirtualPath { get; private set; }

        private void Initialize(Type typeToLocateAssembly, string virtualPath, string namespaceName, PortableAreaMap map)
        {
            this.map = map;
            this.typeToLocateAssembly = typeToLocateAssembly;
            // should we disallow an empty virtual path?
            VirtualPath = virtualPath.ToLower();
            this.namespaceName = namespaceName.ToLower();

            string[] resourceNames = this.typeToLocateAssembly.Assembly.GetManifestResourceNames();
            resources = new Dictionary<string, string>(resourceNames.Length);
            foreach (string name in resourceNames)
            {
                resources.Add(name.ToLower(), name);
            }
        }

        public ResourceSet GetMultiLanguageResouce(string resouceName)
        {
            string fullResourceName = GetFullyQualifiedTypeFromPath(resouceName);

            string actualResourceName = null;

            if (resources.TryGetValue(fullResourceName, out actualResourceName))
            {
                int t = fullResourceName.Length - ".resources".Length;
                var manage = new ResourceManager(actualResourceName.Substring(0, t), typeToLocateAssembly.Assembly);

                ResourceSet result = manage.GetResourceSet(Thread.CurrentThread.CurrentUICulture, true, true);
                if (result != null)
                    return result;
            }
            return null;
        }
        /// <summary>
        /// 查找某个命名空间下面的js，因此js的文件名称只能是 xxx.js,而不能带有点的文件名称，否则他们会被认为是另外一个命名空间
        /// </summary>
        /// <param name="namespaceInSearch"></param>
        /// <param name="extendJs"></param>
        /// <returns></returns>
        public string[] MatchPath(string namespaceInSearch, string extendJs)
        {
            var list = new List<string>();
            namespaceInSearch = namespaceInSearch.ToLower();
            foreach (var dict in this.resources.Keys)
            {

                if (dict.StartsWith(namespaceInSearch) && dict.EndsWith(extendJs))
                {
                    var pos = dict.IndexOf(".", namespaceInSearch.Length + 1, dict.Length - extendJs.Length - namespaceInSearch.Length - 1, System.StringComparison.Ordinal);
                    if (pos == -1)
                    {
                        list.Add(dict.Replace(namespaceInSearch + ".", ""));
                    }
                }

            }
            return list.ToArray();
        }
        public Stream GetResourceStream(string resourceName)
        {
            string fullResourceName = GetFullyQualifiedTypeFromPath(resourceName);

             string actualResourceName = null;

            if (resources.TryGetValue(fullResourceName, out actualResourceName))
            {
                Stream stream = typeToLocateAssembly.Assembly.GetManifestResourceStream(actualResourceName);

                if (map != null &&
                    (resourceName.ToLower().EndsWith(".aspx")
                     || resourceName.ToLower().EndsWith(".master")))
                    return map.Transform(stream);
                return stream;
            }
            return null;
        }

        public string GetFullyQualifiedTypeFromPath(string path)
        {
            string resourceName = path.ToLower().Replace("~", namespaceName);
            // we can make this more succinct if we don't have to check for emtpy virtual path (by preventing in constuctor)
            if (!string.IsNullOrEmpty(VirtualPath))
                resourceName = resourceName.Replace(VirtualPath, "");
            return resourceName.Replace("/", ".");
        }

        public bool IsPathResourceStream(string path)
        {
            string fullResourceName = GetFullyQualifiedTypeFromPath(path);
            return resources.ContainsKey(fullResourceName);
        }
    }
}