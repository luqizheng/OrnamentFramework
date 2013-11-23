using System;
using System.IO;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using MvcContrib.PortableAreas;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    /// </summary>
    public class CombineModule : BaseCombineModule
    {
        /// <summary>
        /// </summary>
        /// <param name="physicPath"></param>
        /// <param name="virtualPath"></param>
        /// <param name="combine"></param>
        public CombineModule(BundleContext context, string physicPath, string virtualPath, bool combine)
            : base(context, physicPath, virtualPath, combine)
        {
            UniqueId = physicPath;
        }

        /// <summary>
        /// </summary>
        public string PhysciPath
        {
            get { return UniqueId; }
        }

        /// <summary>
        /// </summary>
        /// <param name="combinedModules">已经合并过</param>
        /// <param name="referencModule">reference 过的 module </param>
        /// <returns></returns>
        public virtual string BuildContent(ModualIdSets combinedModules, ModuleCollection referencModule)
        {
            string content = null;
            if (!File.Exists(PhysciPath))
            {
                //try to get from Assembly;
                /*var path = PhysciPath.Replace("/", ".");
                var area = path.Split(new[] { "." }, StringSplitOptions.RemoveEmptyEntries)[0];*/
                var resData = RouteUtils.GetRouteDataByUrl(PhysciPath);
                var areaName = (string)resData.DataTokens["area"];
                var resourcePath = resData.Values["resourcePath"].ToString();
                var resourceName = resData.Values["resourceName"].ToString();
                resourceName = resourcePath + "." + resourceName;
                var resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
                Stream resourceStream = resourceStore.GetResourceStream(resourceName);
                using (var readerStream = new StreamReader(resourceStream))
                {
                    content = readerStream.ReadToEnd();
                }
            }
            else
            {
                using (var reader = new StreamReader(PhysciPath))
                {
                    content = reader.ReadToEnd();
                }
            }
            return BuildContent(content, combinedModules, referencModule);
        }
    }
}