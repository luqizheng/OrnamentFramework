using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs.Modules
{
    class MainWebFileCombine : CombineModule
    {
        public MainWebFileCombine(string uniqueId, BundleContext context, bool isCombine)
            : base(uniqueId, context, isCombine)
        {
        }

        public override string Content
        {
            get
            {
                var bundle = BundleTable.Bundles.GetBundleFor(this.UniqueId)
                    .EnumerateFiles(this.Context).First().VirtualFile.VirtualPath;
                bundle = this.MapToPhysicPath(bundle);
                using (var reader = new StreamReader(bundle))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        public static bool IsInMainFolder(string srcUniqure)
        {
            if (!srcUniqure.StartsWith("~"))
            {
                srcUniqure = "~" + srcUniqure;
            }
            try
            {
                var bundle = BundleTable.Bundles.GetBundleFor(srcUniqure);
                if (bundle != null)
                    return true;

                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }

        }
    }
}
