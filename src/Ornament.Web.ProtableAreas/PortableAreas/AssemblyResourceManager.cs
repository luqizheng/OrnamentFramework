using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.Web.InputBuilder.ViewEngine;

namespace Ornament.Web.PortableAreas
{
    public static class AssemblyResourceManager
    {
        private static readonly Dictionary<string, AssemblyResourceStore> assemblyResourceStores =
            InitializeAssemblyResourceStores();

        public static AssemblyResourceStore GetResourceStoreForArea(string areaName)
        {
            return assemblyResourceStores["/areas/" + areaName.ToLower()];
        }

        public static AssemblyResourceStore GetResourceStoreFromVirtualPath(string virtualPath)
        {
            string path = VirtualPathUtility.ToAppRelative(virtualPath).ToLower();
            foreach (var pair in assemblyResourceStores.Reverse())
            {
                if (path.Contains(pair.Key) && pair.Value.IsPathResourceStream(path))
                {
                    return pair.Value;
                }
            }
            return null;
        }

        private static Dictionary<string, AssemblyResourceStore> InitializeAssemblyResourceStores()
        {
            var dictionary = new Dictionary<string, AssemblyResourceStore>();
            var store = new AssemblyResourceStore(typeof (AssemblyResourceProvider), "/views/inputbuilders",
                "MvcContrib.UI.InputBuilder.Views.InputBuilders");
            dictionary.Add(store.VirtualPath, store);
            return dictionary;
        }

        public static bool IsEmbeddedViewResourcePath(string virtualPath)
        {
            return (GetResourceStoreFromVirtualPath(virtualPath) != null);
        }

        public static void RegisterAreaResources(AssemblyResourceStore assemblyResourceStore)
        {
            assemblyResourceStores.Add(assemblyResourceStore.VirtualPath, assemblyResourceStore);
        }
    }
}