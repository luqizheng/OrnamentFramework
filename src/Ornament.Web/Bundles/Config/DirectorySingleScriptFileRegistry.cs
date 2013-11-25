using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;

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

        protected override void Handle(BundleCollection bundles, string virtualPath1, string bundlePath, StreamWriter logWriter)
        {
            logWriter.WriteLine(bundlePath + ":" + virtualPath1);
            bundles.Add(new SeajsBundle(bundlePath, _isCombine).Include(virtualPath1));
        }

        protected override bool HandleFolder(BundleCollection bundles, DirectoryInfo physicPath, string virtualPath, StreamWriter logWriter)
        {
            return true;
        }
    }
}
