using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.SeajsModules
{
    public class EmbeddedBuilder : IBundleBuilder
    {
        [System.Obsolete]
        public EmbeddedBuilder(string assemblyStartNamespace)
        {
            AssemblyStartNamespace = assemblyStartNamespace;
        }

        public EmbeddedBuilder()
        {

        }

        /// <summary>
        ///     会用这个Namespace 替换AreaName,这样就会从这个Namespace开始找Embed的Seajs模块
        /// </summary>
        [System.Obsolete]
        public string AssemblyStartNamespace { get; private set; }

        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            string filePath = context.HttpContext.Request.CurrentExecutionFilePath;
            if (files.Count() != 0)
            {
                filePath = files.First().IncludedVirtualPath;
            }
            string areaName = GetAreaName(context.HttpContext.Request.CurrentExecutionFilePath);
            if (areaName == null)
                return "";
            return BuildBundleContent(filePath, areaName);
        }

        public string BuildBundleContent(string filePath)
        {
            string areaName = GetAreaName(filePath);
            return BuildBundleContent(filePath, areaName);
        }

        public string BuildBundleContent(string filePath, string areaName)
        {
            if (areaName == null)
                throw new OrnamentException("Cannot find areaName in virtual path " + filePath);

            areaName = areaName.ToLower();
            filePath = filePath.ToLower();

            AssemblyResourceStore resourceStore = AssemblyResourceManager.GetResourceStoreForArea(areaName);

            if (!filePath.StartsWith("~/areas/"))
            {
                filePath = "~/areas" + filePath.TrimStart('~');
            }

            Stream resourceStream = resourceStore.GetResourceStream(filePath);

            if (resourceStream == null)
                return string.Format("console.log('Cannot find embed file {0} in {1} assembly')",
                    resourceStore.GetFullyQualifiedTypeFromPath(filePath), areaName);


            using (var stream = new StreamReader(resourceStream))
            {
                return stream.ReadToEnd();
            }
        }

        private string GetAreaName(string virtualPath)
        {
            if (!virtualPath.StartsWith("~"))
            {
                virtualPath = "~" + virtualPath;
            }

            Bundle bundle = BundleTable.Bundles.GetBundleFor(virtualPath);
            var seajsEmbedBundle = bundle as SeajsEmbedBundle;
            if (seajsEmbedBundle != null)
            {
                return seajsEmbedBundle.AreaName;
            }
            return null;
        }
    }
}