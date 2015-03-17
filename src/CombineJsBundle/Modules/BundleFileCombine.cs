using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules
{
    /// <summary>
    ///     从Web的Bundle上面获得的文件。
    /// </summary>
    internal class BundleFileCombine : CombineModule
    {
        private string _physicalApplicationPath;

        public BundleFileCombine(string uniqueId)
            : base(uniqueId, context)
        {
        }

        /// <summary>
        /// </summary>
        private string PhysicalApplicationPath
        {
            get
            {
                return _physicalApplicationPath ??
                       (_physicalApplicationPath = (Context.HttpContext.Request.PhysicalApplicationPath ?? ""));
            }
        }

        /// <summary>
        /// </summary>
        public virtual string Path
        {
            get
            {
                Bundle bundle = BundleTable.Bundles.GetBundleFor(AbsolutePath);
                if (bundle != null)
                {
                    BundleFile a = bundle.EnumerateFiles(Context).First();
                    return a.IncludedVirtualPath
                        .Replace(PhysicalApplicationPath, "~/")
                        .Replace('\\', '/');
                }
                return OutputId;
            }
        }

        public override string Content
        {
            get
            {
                Bundle bundle = BundleTable.Bundles.GetBundleFor(AbsolutePath);
                BundleFile c = bundle.EnumerateFiles(Context).FirstOrDefault();
                if (c == null)
                {
                    throw new ArgumentNullException(AbsolutePath, AbsolutePath + " not a bundle file ");
                }
                string file = c.VirtualFile.VirtualPath;
                file = MapToPhysicPath(file);
                using (var reader = new StreamReader(file))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        protected virtual string ToAbstrVirtualPath(string virtualPath)
        {
            if (virtualPath.StartsWith("/"))
            {
                return "~" + virtualPath;
            }
            string dir = VirtualPathUtility.GetDirectory(Path);
            string result = VirtualPathUtility.Combine(dir, virtualPath);

            return result;
        }

        protected virtual string MapToPhysicPath(string virtualPath)
        {
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(Path),
                true);
        }

        public static bool IsInMainFolder(string srcUniqure)
        {
            if (!srcUniqure.StartsWith("~"))
            {
                srcUniqure = "~" + srcUniqure;
            }
            try
            {
                Bundle bundle = BundleTable.Bundles.GetBundleFor(srcUniqure);
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