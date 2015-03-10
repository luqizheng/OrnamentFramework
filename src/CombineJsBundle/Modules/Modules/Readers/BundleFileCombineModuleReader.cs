using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules.Readers
{
    public class BundleFileCombineModuleReader : ScriptReader
    {

        protected override string GetContent(ScriptModule module, BundleContext context)
        {
           Bundle bundle = BundleTable.Bundles.GetBundleFor(module.RequireId);
            if (bundle == null)
                return null;
            return GetContent(bundle, context, module.AbsolutePath);

        }

        protected virtual string GetContent(Bundle bundle, BundleContext context,string absolutePath)
        {
           
            BundleFile c = bundle.EnumerateFiles(context).FirstOrDefault();
            if (c == null)
            {
                throw new ArgumentNullException(absolutePath, absolutePath + " not a bundle file ");
            }
            string file = c.VirtualFile.VirtualPath;
            file = MapToPhysicPath(file,context);
            using (var reader = new StreamReader(file))
            {
                return reader.ReadToEnd();
            }
        }
        
        protected virtual string MapToPhysicPath(string virtualPath,BundleContext context)
        {
            var path = Path(virtualPath, context);
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(path),true);
        }

        /// <summary>
        /// </summary>
        public virtual string Path(string absolutePath,BundleContext context)
        {
            

                Bundle bundle = BundleTable.Bundles.GetBundleFor(absolutePath);
                if (bundle != null)
                {
                    BundleFile a = bundle.EnumerateFiles(context).First();
                    return a.IncludedVirtualPath
                        .Replace(context.HttpContext.Request.PhysicalApplicationPath ?? "", "~/")
                        .Replace('\\', '/');
                }
                return absolutePath;
            
        }
    }


}