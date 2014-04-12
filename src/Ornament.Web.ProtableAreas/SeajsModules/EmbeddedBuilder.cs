using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.SeajsModules
{
    public class EmbeddedBuilder : IBundleBuilder
    {
        public EmbeddedBuilder()
        {
        }

        [Obsolete]
        public EmbeddedBuilder(string assemblyStartNamespace)
        {
            AssemblyStartNamespace = assemblyStartNamespace;
        }

        [Obsolete]
        public string AssemblyStartNamespace { get; private set; }

        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            string currentExecutionFilePath = context.HttpContext.Request.CurrentExecutionFilePath;
            if (files.Count() != 0)
            {
                currentExecutionFilePath = files.First().IncludedVirtualPath;
            }
            string areaName = GetAreaName(context.HttpContext.Request.CurrentExecutionFilePath);
            if (areaName == null)
            {
                return "";
            }
            return BuildBundleContent(currentExecutionFilePath, areaName);
        }

        public string BuildBundleContent(string filePath)
        {
            string areaName = GetAreaName(filePath);
            return BuildBundleContent(filePath, areaName);
        }

        public string BuildBundleContent(string filePath, string areaName)
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
                filePath = "~/areas" + filePath.TrimStart(new[] {'~'});
            }
            Stream resourceStream = resourceStoreForArea.GetResourceStream(filePath);
            if (resourceStream == null)
            {
                return string.Format("console.log('Cannot find embed file {0} in {1} assembly')",
                    resourceStoreForArea.GetFullyQualifiedTypeFromPath(filePath), areaName);
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
            var bundleFor = BundleTable.Bundles.GetBundleFor(virtualPath) as SeajsEmbedBundle;
            if (bundleFor != null)
            {
                return bundleFor.AreaName;
            }
            return null;
        }
    }
}