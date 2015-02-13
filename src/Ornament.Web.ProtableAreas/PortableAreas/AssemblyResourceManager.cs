using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.Web.InputBuilder.ViewEngine;

namespace Ornament.Web.PortableAreas
{
    public static class AssemblyResourceManager
    {
        private static readonly Dictionary<string, AssemblyResourceStore> AssemblyResourceStores =
            InitializeAssemblyResourceStores();

        public static AssemblyResourceStore GetResourceStoreForArea(string areaName)
        {
            return AssemblyResourceStores["/areas/" + areaName.ToLower()];
        }

        public static AssemblyResourceStore GetResourceStoreFromVirtualPath(string virtualPath)
        {
            string path = VirtualPathUtility.ToAppRelative(virtualPath).ToLower();
#if DEBUG
            foreach (var key in AssemblyResourceStores.Keys)
            {
                if (path.Contains(key) && AssemblyResourceStores[key].IsPathResourceStream(path))
                {
                    return AssemblyResourceStores[key];
                }
            }
            return null;
#else
                       return (from pair in AssemblyResourceStores.Reverse() where path.Contains(pair.Key) && pair.Value.IsPathResourceStream(path) select pair.Value).FirstOrDefault();
#endif

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
            AssemblyResourceStores.Add(assemblyResourceStore.VirtualPath, assemblyResourceStore);
        }
    }
}