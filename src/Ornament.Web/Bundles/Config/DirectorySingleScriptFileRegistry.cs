using System;
using System.IO;
using System.Web.Optimization;
using SeajsBundles;

namespace Ornament.Web.Bundles.Config
{
    public class DirectorySingleScriptFileRegistry : BaseScriptsManager
    {
        private readonly bool _isCombine;

        public DirectorySingleScriptFileRegistry(string searchDirPath, string regPath, bool isCombine)
            : base(searchDirPath, regPath)
        {
            _isCombine = isCombine;
        }

        protected override bool IsCombine(DirectoryInfo directoryInfo, StreamWriter log)
        {
            return false;
        }

        protected override void Handle(BundleCollection bundles, string bundlePath, StreamWriter logWriter,
            params string[] includeVirtualPathes)
        {
            logWriter.WriteLine("Directory:{0}:{1}", bundlePath, String.Join(",", includeVirtualPathes));
            var c = new SeajsBundle(bundlePath, _isCombine);
            var f = c.Include(includeVirtualPathes);
            bundles.Add(f);

        }
    }
}