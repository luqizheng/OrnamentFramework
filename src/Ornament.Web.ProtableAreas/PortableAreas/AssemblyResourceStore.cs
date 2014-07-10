using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Resources;
using System.Threading;

namespace Ornament.Web.PortableAreas
{
    public class AssemblyResourceStore
    {
        private readonly PortableAreaMap _map;
        private readonly string _namespaceName;
        private readonly Type _typeToLocateAssembly;
        private string _assemblyRootNamespaceName = "";

        private Dictionary<string, string> _resources;


        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName)
        {
            _typeToLocateAssembly = typeToLocateAssembly;
            _namespaceName = namespaceName;
            VirtualPath = virtualPath.ToLower();
        }

        public AssemblyResourceStore(Type typeToLocateAssembly, string virtualPath, string namespaceName,
            PortableAreaMap map)
            : this(typeToLocateAssembly, virtualPath, namespaceName)
        {
            _map = map;
        }

        public string VirtualPath { get; private set; }

        private string AssemblyRootNamespaceName
        {
            get
            {
                if (String.IsNullOrEmpty(_assemblyRootNamespaceName))
                {
                    lock (_namespaceName)
                    {
                        if (String.IsNullOrEmpty(_assemblyRootNamespaceName))
                        {
                            Initialize(_namespaceName);
                        }
                    }
                }
                return _assemblyRootNamespaceName;
            }
        }

        private string FindRootNamespace(IEnumerable<string> resourceNames, string areaNamespace)
        {
            string str = areaNamespace.ToLower();
            foreach (string str2 in resourceNames)
            {
                string str3 = str2.ToLower();
                if (!str3.StartsWith(str))
                {
                    var source = new Stack<string>(str.Split(new[] {'.'}));
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


        private void Initialize(string areaNamespace)
        {
            string[] manifestResourceNames = _typeToLocateAssembly.Assembly.GetManifestResourceNames();
            _resources = new Dictionary<string, string>(manifestResourceNames.Length);
            _assemblyRootNamespaceName = FindRootNamespace(manifestResourceNames, areaNamespace);
            foreach (string str in manifestResourceNames)
            {
                if (str.StartsWith(areaNamespace))
                {
                    string key = _assemblyRootNamespaceName + str.ToLower().Substring(areaNamespace.Length);
                    _resources.Add(key, str);
                }
                else
                {
                    _resources.Add(str.ToLower(), str);
                }
            }
        }

        public Stream GetResourceStream(string resourceName)
        {
            string fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(resourceName);
            string str2 = null;
            if (_resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                Stream manifestResourceStream = _typeToLocateAssembly.Assembly.GetManifestResourceStream(str2);
                if ((_map != null) &&
                    (resourceName.ToLower().EndsWith(".aspx") || resourceName.ToLower().EndsWith(".master")))
                {
                    return _map.Transform(manifestResourceStream);
                }
                return manifestResourceStream;
            }
            return null;
        }

        public string GetFullyQualifiedTypeFromPath(string path)
        {
            string str = path.ToLower().Replace("~", AssemblyRootNamespaceName);
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
            if (_resources.TryGetValue(fullyQualifiedTypeFromPath, out str2))
            {
                int length = str2.Length - ".resources".Length;
                ResourceSet set =
                    new ResourceManager(str2.Substring(0, length), _typeToLocateAssembly.Assembly).GetResourceSet(
                        Thread.CurrentThread.CurrentUICulture, true, true);
                if (set != null)
                {
                    return set;
                }
            }
            return null;
        }


        public bool IsPathResourceStream(string path)
        {
            string fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(path);
            return _resources.ContainsKey(fullyQualifiedTypeFromPath);
        }

        public bool IsPathResourceStream(string path, out string fullyQualifiedTypeFromPath)
        {
            fullyQualifiedTypeFromPath = GetFullyQualifiedTypeFromPath(path);
            return _resources.ContainsKey(fullyQualifiedTypeFromPath);
        }

        public string[] MatchPath(string namespaceInSearch, string extendJs)
        {
            var list = new List<string>();
            namespaceInSearch = GetFullyQualifiedTypeFromPath(namespaceInSearch.ToLower());
            foreach (string str in _resources.Keys)
            {
                if ((str.StartsWith(namespaceInSearch) && str.EndsWith(extendJs)) &&
                    (str.IndexOf(".", namespaceInSearch.Length + 1,
                        ((str.Length - extendJs.Length) - namespaceInSearch.Length) - 1, StringComparison.Ordinal) == -1))
                {
                    list.Add(str.Replace(namespaceInSearch, "").TrimStart('.'));
                }
            }
            return list.ToArray();
        }
    }
}