using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Optimization;
using System.Web.Routing;
using Ornament.Web.PortableAreas;
using SeajsBundles;

namespace Ornament.Web.SeajsModules
{
    public class EmbeddedBuilder : IBundleBuilder
    {
        public EmbeddedBuilder(string assemblyStartNamespace)
        {
            AssemblyStartNamespace = assemblyStartNamespace;
        }

        /// <summary>
        ///     会用这个Namespace 替换AreaName,这样就会从这个Namespace开始找Embed的Seajs模块
        /// </summary>
        public string AssemblyStartNamespace { get; private set; }

        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            string filePath = context.HttpContext.Request.CurrentExecutionFilePath;
            RouteData data = RouteUtils.GetRouteDataByUrl(filePath);
            if (data == null)
                return "";
            return BuildBundleContent(context.HttpContext.Request.CurrentExecutionFilePath);
        }

        public string BuildBundleContent(string filePath)
        {

            RouteData data = RouteUtils.GetRouteDataByUrl(filePath);
            if (data == null)
                return "";
            var areaName = (string)data.DataTokens["area"];
            if (areaName == null)
                throw new OrnamentException("Cannot find areaName in virtual path " + filePath);
            areaName = areaName.ToLower();
            filePath = filePath.ToLower();
            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            string resoureContent = filePath.Replace(areaName, AssemblyStartNamespace).TrimStart('/');
            Stream resourceStream = resourceStore.GetResourceStream(resoureContent);

            if (resourceStream == null)
                return string.Format("console.log('Cannot find embed file {0} in {1} assembly')",
                    resourceStore.GetFullyQualifiedTypeFromPath(resoureContent), areaName);


            using (var stream = new StreamReader(resourceStream))
            {
                return stream.ReadToEnd();
            }
        }
    }
}