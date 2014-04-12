namespace Ornament.Web.PortableAreas
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Resources;
    using System.Runtime.CompilerServices;
    using System.Threading;

    public class AssemblyResourceStore
    {
        private PortableAreaMap map;
        private string namespaceName;
        private Dictionary<string, string> resources;
        private Type typeToLocateAssembly;

        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName)
        {
            this.Initialize(typeToLocateAssembly, virtualPath, namespaceName, null);
        }

        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName, PortableAreaMap map)
        {
            this.Initialize(typeToLocateAssembly, virtualPath, namespaceName, map);
        }

        private string FindRootNamespace(IEnumerable<string> resourceNames, string areaNamespace)
        {
            string str = areaNamespace.ToLower();
            foreach (string str2 in resourceNames)
            {
                string str3 = str2.ToLower();
                if (!str3.StartsWith(str))
                {
                    Stack<string> source = new Stack<string>(str.Split(new char[] { '.' }));
                    source.Pop();
                    while ((source.Count != 0) && !str3.StartsWith(string.Join(".", source.Reverse<string>())))
                    {
                        source.Pop();
                    }
                    if (source.Count != 0)
                    {
                        str = string.Join(".", source.Reverse<string>());
                    }
                }
            }
            return str;
        }

        public string GetFullyQualifiedTypeFromPath(string path)
        {
            string str = path.ToLower().Replace("~", this.namespaceName);
            if (!string.IsNullOrEmpty(this.VirtualPath))
            {
                str = str.Replace(this.VirtualPath, "");
            }
            return str.Replace("/", ".");
        }

        public ResourceSet GetMultiLanguageResouce(string resouceName)
        {
            string fullyQualifiedTypeFromPath = this.GetFullyQualifiedTypeFromPath(resouceName);
            string str2 = null;
            if (this.resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                int length = str2.Length - ".resources".Length;
                ResourceSet set = new ResourceManager(str2.Substring(0, length), this.typeToLocateAssembly.Assembly).GetResourceSet(Thread.CurrentThread.CurrentUICulture, true, true);
                if (set != null)
                {
                    return set;
                }
            }
            return null;
        }
        
        public Stream GetResourceStream(string resourceName)
        {
            string fullyQualifiedTypeFromPath = this.GetFullyQualifiedTypeFromPath(resourceName);
            string str2 = null;
            if (this.resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                Stream manifestResourceStream = this.typeToLocateAssembly.Assembly.GetManifestResourceStream(str2);
                if ((this.map != null) && (resourceName.ToLower().EndsWith(".aspx") || resourceName.ToLower().EndsWith(".master")))
                {
                    return this.map.Transform(manifestResourceStream);
                }
                return manifestResourceStream;
            }
            return null;
        }

        private void Initialize(Type typeToLocateAssembly, string virtualPath, string areaNamespace, PortableAreaMap map)
        {
            this.map = map;
            this.typeToLocateAssembly = typeToLocateAssembly;
            this.VirtualPath = virtualPath.ToLower();
            string[] manifestResourceNames = this.typeToLocateAssembly.Assembly.GetManifestResourceNames();
            this.resources = new Dictionary<string, string>(manifestResourceNames.Length);
            this.namespaceName = this.FindRootNamespace(manifestResourceNames, areaNamespace);
            foreach (string str in manifestResourceNames)
            {
                if (str.StartsWith(areaNamespace))
                {
                    string key = this.namespaceName + str.ToLower().Substring(areaNamespace.Length);
                    this.resources.Add(key, str);
                }
                else
                {
                    this.resources.Add(str.ToLower(), str);
                }
            }
        }

        public bool IsPathResourceStream(string path)
        {
            string fullyQualifiedTypeFromPath = this.GetFullyQualifiedTypeFromPath(path);
            return this.resources.ContainsKey(fullyQualifiedTypeFromPath);
        }
        public bool IsPathResourceStream(string path, out string fullyQualifiedTypeFromPath)
        {
            fullyQualifiedTypeFromPath = this.GetFullyQualifiedTypeFromPath(path);
            return this.resources.ContainsKey(fullyQualifiedTypeFromPath);
        }
        public string[] MatchPath(string namespaceInSearch, string extendJs)
        {
            List<string> list = new List<string>();
            namespaceInSearch = this.GetFullyQualifiedTypeFromPath(namespaceInSearch.ToLower());
            foreach (string str in this.resources.Keys)
            {
                if ((str.StartsWith(namespaceInSearch) && str.EndsWith(extendJs)) && (str.IndexOf(".", namespaceInSearch.Length + 1, ((str.Length - extendJs.Length) - namespaceInSearch.Length) - 1, StringComparison.Ordinal) == -1))
                {
                    list.Add(str.Replace(namespaceInSearch + ".", ""));
                }
            }
            return list.ToArray();
        }

        public string VirtualPath { get; private set; }
    }
}

