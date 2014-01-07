using System;
using System.Collections.Generic;
using System.IO;

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