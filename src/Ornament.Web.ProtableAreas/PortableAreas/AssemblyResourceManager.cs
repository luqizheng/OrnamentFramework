using System.Collections.Generic;
using System.Web;
using Ornament.Web.InputBuilder.ViewEngine;
using Ornament.Web.PortableAreas.InputBuilder.ViewEngine;

namespace Ornament.Web.PortableAreas
{
    /// <summary>
    ///     Manages all .NET assemblies that have registered their embedded resources.
    /// </summary>
    public static class AssemblyResourceManager
    {
        private static readonly Dictionary<string, AssemblyResourceStore> assemblyResourceStores =
            InitializeAssemblyResourceStores();

        private static Dictionary<string, AssemblyResourceStore> InitializeAssemblyResourceStores()
        {
            var resourceStores = new Dictionary<string, AssemblyResourceStore>();

            // Add default AssemblyResourceStore for input builders
            var inputBuildersStore = new AssemblyResourceStore(typeof(AssemblyResourceProvider), "/views/inputbuilders",
                "MvcContrib.UI.InputBuilder.Views.InputBuilders");
            resourceStores.Add(inputBuildersStore.VirtualPath, inputBuildersStore);

            return resourceStores;
        }

        public static AssemblyResourceStore GetResourceStoreForArea(string areaName)
        {
            return assemblyResourceStores["/areas/" + areaName.ToLower()];
        }

        public static AssemblyResourceStore GetResourceStoreFromVirtualPath(string virtualPath)
        {
            string checkPath = VirtualPathUtility.ToAppRelative(virtualPath).ToLower();
            //HttpContext.Current.Response.Write("to:" + checkPath + "<br>");
            foreach (var resourceStore in assemblyResourceStores)
            {
                var area = resourceStore.Key.Replace("/areas/", "");
                var fixTheArea = checkPath.Replace("~/" + area + "/", "~/");
                if (resourceStore.Value.IsPathResourceStream(fixTheArea))
                {
                    return resourceStore.Value;
                }
            }
            return null;
        }

        public static bool IsEmbeddedViewResourcePath(string virtualPath)
        {
            AssemblyResourceStore resourceStore = GetResourceStoreFromVirtualPath(virtualPath);
            return (resourceStore != null);
        }

        public static void RegisterAreaResources(AssemblyResourceStore assemblyResourceStore)
        {
            assemblyResourceStores.Add(assemblyResourceStore.VirtualPath, assemblyResourceStore);
        }
    }
}