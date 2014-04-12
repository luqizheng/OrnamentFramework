using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Resources;
using System.Threading;

namespace Ornament.Web.PortableAreas
{
    /// <summary>
    ///     Stores all the embedded resources for a single assembly/area.
    /// </summary>
    public class AssemblyResourceStore
    {
        // Fields
        private PortableAreaMap map;
        private string namespaceName;
        private Dictionary<string, string> resources;
        private Type typeToLocateAssembly;

        // Methods
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

        private string FindRootNamespace(IEnumerable<string> resourceNames, string areaNamespace)
        {
            string str = areaNamespace.ToLower();
            foreach (string str2 in resourceNames)
            {
                string str3 = str2.ToLower();
                if (!str3.StartsWith(str))
                {
                    var source = new Stack<string>(str.Split(new[] { '.' }));
                    source.Pop();
                    while ((source.Count != 0) && !str3.StartsWith(string.Join(".", source.Reverse())))
                    {
                        source.Pop();
                    }
                    if (source.Count != 0)
                    {
                        str = string.Join(".", source.Reverse());
                    }
                }
            }
            return str;
        }

        public string GetFullyQualifiedTypeFromPath(string path)
        {
            string str = path.ToLower().Replace("~", namespaceName);
            if (!string.IsNullOrEmpty(VirtualPath))
            {
                str = str.Replace(VirtualPath, "");
            }
            return str.Replace("/", ".");
        }

        public ResourceSet GetMultiLanguageResouce(string resouceName)
        {
            string fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(resouceName);
            string str2 = null;
            if (resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                int length = str2.Length - ".resources".Length;
                ResourceSet set =
                    new ResourceManager(str2.Substring(0, length), typeToLocateAssembly.Assembly).GetResourceSet(
                        Thread.CurrentThread.CurrentUICulture, true, true);
                if (set != null)
                {
                    return set;
                }
            }
            return null;
        }

        public Stream GetResourceStream(string resourceName)
        {
            string fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(resourceName);
            string str2 = null;
            if (resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                Stream manifestResourceStream = typeToLocateAssembly.Assembly.GetManifestResourceStream(str2);
                if ((map != null) &&
                    (resourceName.ToLower().EndsWith(".aspx") || resourceName.ToLower().EndsWith(".master")))
                {
                    return map.Transform(manifestResourceStream);
                }
                return manifestResourceStream;
            }
            return null;
        }

        private void Initialize(Type typeToLocateAssembly, string virtualPath, string areaNamespace, PortableAreaMap map)
        {
            this.map = map;
            this.typeToLocateAssembly = typeToLocateAssembly;
            VirtualPath = virtualPath.ToLower();
            string[] manifestResourceNames = this.typeToLocateAssembly.Assembly.GetManifestResourceNames();
            resources = new Dictionary<string, string>(manifestResourceNames.Length);
            namespaceName = FindRootNamespace(manifestResourceNames, areaNamespace);
            foreach (string str in manifestResourceNames)
            {
                if (str.StartsWith(areaNamespace))
                {
                    string key = namespaceName + str.ToLower().Substring(areaNamespace.Length);
                    resources.Add(key, str);
                }
                else
                {
                    resources.Add(str.ToLower(), str);
                }
            }
        }

        public bool IsPathResourceStream(string path)
        {
            string fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(path);
            return resources.ContainsKey(fullyQualifiedTypeFromPath);
        }

        public string[] MatchPath(string namespaceInSearch, string extendJs)
        {
            var list = new List<string>();
            namespaceInSearch = GetFullyQualifiedTypeFromPath(namespaceInSearch.ToLower());
            foreach (string str in resources.Keys)
            {
                if ((str.StartsWith(namespaceInSearch) && str.EndsWith(extendJs)) &&
                    (str.IndexOf(".", namespaceInSearch.Length + 1,
                        ((str.Length - extendJs.Length) - namespaceInSearch.Length) - 1, StringComparison.Ordinal) == -1))
                {
                    list.Add(str.Replace(namespaceInSearch + ".", ""));
                }
            }
            return list.ToArray();
        }

        // Properties
    }
}