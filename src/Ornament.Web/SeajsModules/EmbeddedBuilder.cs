using System.Collections.Generic;
using System.IO;
using System.Web.Optimization;
using Ornament.Web.PortableAreas;
using SeajsBundles;

namespace Ornament.Web.SeajsModules
{
    public class EmbeddedBuilder : IBundleBuilder
    {
        public EmbeddedBuilder(string assemblyStartNamespace)
        {
            this.AssemblyStartNamespace = assemblyStartNamespace;

        }
        /// <summary>
        /// 会用这个Namespace 替换AreaName,这样就会从这个Namespace开始找Embed的Seajs模块
        /// </summary>
        public string AssemblyStartNamespace { get; set; }
        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            var filePath = context.HttpContext.Request.CurrentExecutionFilePath;
            var data = RouteUtils.GetRouteDataByUrl(filePath);
            if (data == null)
                return "";
            var areaName = (string)data.DataTokens["area"];
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            var resoureContent = filePath.Replace(areaName, AssemblyStartNamespace).TrimStart('/');
            Stream resourceStream = resourceStore.GetResourceStream(resoureContent);

            if (resourceStream == null)
                return string.Format("console.log('Can't find embed file {0} in {1} assembly')", resourceStore.GetFullyQualifiedTypeFromPath(resoureContent), areaName);



            using (var stream = new StreamReader(resourceStream))
            {
                return stream.ReadToEnd();
            }

        }
    }
}