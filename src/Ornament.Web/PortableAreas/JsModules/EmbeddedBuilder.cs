using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Optimization;

namespace Ornament.Web.PortableAreas.JsModules
{
    public class EmbeddedBuilder : IBundleBuilder
    {
        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            string currentExecutionFilePath = bundle.Path;
            if (files.Count() != 0)
            {
                currentExecutionFilePath = files.First().IncludedVirtualPath;
            }
            string areaName = GetAreaName(bundle.Path);
            if (areaName == null)
            {
                return "";
            }

            return BuildBundleContent(currentExecutionFilePath, areaName, context);
        }

        public string BuildBundleContent(string filePath, string areaName, BundleContext context)
        {
            if (areaName == null)
            {
                throw new OrnamentException("Cannot find areaName in virtual path " + filePath);
            }
            areaName = areaName.ToLower();
            filePath = filePath.ToLower();
            AssemblyResourceStore resourceStoreForArea = AssemblyResourceManager.GetResourceStoreForArea(areaName);
            if (!filePath.StartsWith("~/areas/"))
            {
                filePath = "~/areas" + filePath.TrimStart(new[] { '~' });
            }
            if (!filePath.EndsWith(".js"))
            {
                filePath += ".js";
            }
            Stream resourceStream = resourceStoreForArea.GetResourceStream(filePath);
            if (resourceStream == null)
            {
                var log = log4net.LogManager.GetLogger(this.GetType());
                log.ErrorFormat("'Cannot find embed file {0} in {1} assembly')", resourceStoreForArea.GetFullyQualifiedTypeFromPath(filePath), areaName);
                if (log.IsDebugEnabled)
                {
                    StringBuilder builder = new StringBuilder();
                    foreach (var item in resourceStoreForArea.Resources)
                    {
                        builder.Append(item.Key).Append(":").AppendLine(item.Value);
                    }
                    log.DebugFormat("checkKEY:{0},\r\n{1}", filePath, builder);
                }

                return string.Format("console.log('Cannot find embed file {0} in {1} assembly')", resourceStoreForArea.GetFullyQualifiedTypeFromPath(filePath), areaName);

            }
            using (var reader = new StreamReader(resourceStream))
            {
                return reader.ReadToEnd();
            }
        }

        private string GetAreaName(string virtualPath)
        {
            if (!virtualPath.StartsWith("~"))
            {
                virtualPath = "~" + virtualPath;
            }
            var bundleFor = BundleTable.Bundles.GetBundleFor(virtualPath) as EmbedBundle;
            if (bundleFor != null)
            {
                return bundleFor.AreaName;
            }
            return null;
        }
    }
}