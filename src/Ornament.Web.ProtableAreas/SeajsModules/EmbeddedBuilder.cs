namespace Ornament.Web.SeajsModules
{
    using Ornament;
    using Ornament.Web.PortableAreas;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.CompilerServices;
    using System.Web.Optimization;

    public class EmbeddedBuilder : IBundleBuilder
    {
        public EmbeddedBuilder()
        {
        }

        [Obsolete]
        public EmbeddedBuilder(string assemblyStartNamespace)
        {
            this.AssemblyStartNamespace = assemblyStartNamespace;
        }

        public string BuildBundleContent(string filePath)
        {
            string areaName = this.GetAreaName(filePath);
            return this.BuildBundleContent(filePath, areaName);
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
                filePath = "~/areas" + filePath.TrimStart(new char[] { '~' });
            }
            Stream resourceStream = resourceStoreForArea.GetResourceStream(filePath);
            if (resourceStream == null)
            {
                return string.Format("console.log('Cannot find embed file {0} in {1} assembly')", resourceStoreForArea.GetFullyQualifiedTypeFromPath(filePath), areaName);
            }
            using (StreamReader reader = new StreamReader(resourceStream))
            {
                return reader.ReadToEnd();
            }
        }

        public string BuildBundleContent(Bundle bundle, BundleContext context, IEnumerable<BundleFile> files)
        {
            string currentExecutionFilePath = context.HttpContext.Request.CurrentExecutionFilePath;
            if (files.Count<BundleFile>() != 0)
            {
                currentExecutionFilePath = files.First<BundleFile>().IncludedVirtualPath;
            }
            string areaName = this.GetAreaName(bundle.Path);
            if (areaName == null)
            {
                return "";
            }
            return this.BuildBundleContent(currentExecutionFilePath, areaName);
        }

        private string GetAreaName(string virtualPath)
        {
            if (!virtualPath.StartsWith("~"))
            {
                virtualPath = "~" + virtualPath;
            }
            SeajsEmbedBundle bundleFor = BundleTable.Bundles.GetBundleFor(virtualPath) as SeajsEmbedBundle;
            if (bundleFor != null)
            {
                return bundleFor.AreaName;
            }
            return null;
        }

        [Obsolete]
        public string AssemblyStartNamespace { get; private set; }
    }
}

