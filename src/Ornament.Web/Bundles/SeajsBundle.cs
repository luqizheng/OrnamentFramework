﻿using System.Collections.Generic;
using System.IO;
using System.Web.Optimization;

namespace Ornament.Web.Bundles
{
    /// <summary>
    /// </summary>
    public class SeajsBundle : ScriptBundle
    {
        private readonly string _virtualPath;

        public SeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            _virtualPath = virtualPath.TrimStart('~');
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(virtualPath));
            }
        }

        public SeajsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            Transforms.Clear();
            if (BundleTable.EnableOptimizations)
            {
                Transforms.Add(new SeajsMinify(_virtualPath));
            }
        }

        public override BundleResponse ApplyTransforms(BundleContext context, string bundleContent,
                                                       IEnumerable<BundleFile> bundleFiles)
        {
            var seajs = new CombineSeajs(this.Path, "/scripts/models/base/");
            BundleResponse result = base.ApplyTransforms(context, seajs.Processs(bundleContent), bundleFiles);
#if DEBUG
            UpdateCache(context, result);
#endif
            return result;
        }
    }
}