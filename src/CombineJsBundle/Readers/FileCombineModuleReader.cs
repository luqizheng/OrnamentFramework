using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using CombineJs.Modules;

namespace CombineJs.Readers
{
    public class FileCombineModuleReader : CombineModuleReader
    {
        /*public bool Build(string scriptPath, ModuleFactory context, ScriptModule parent, out CombineModule module)
        {
            module = Create(scriptPath, context.Context, parent);
            context.Repository.Add(module);
            module.Content = GetContent(module, context.Context);


            if (module.Content != null)
            {
                return true;
            }
            context.Repository.Remove(module);
            module = null;
            return false;
        }*/


        protected override string GetContent(Bundle bundle, BundleContext context, ScriptModule module)
        {
            //var absolutePath = module.AbsolutePath;
            BundleFile c = bundle.EnumerateFiles(context).FirstOrDefault();
            if (c == null)
            {
                return null;
            }
            string file = c.VirtualFile.VirtualPath;
            file = MapToPhysicPath(file, context);
            using (var reader = new StreamReader(file))
            {
                return reader.ReadToEnd();
            }
        }

        protected virtual string MapToPhysicPath(string virtualPath, BundleContext context)
        {
            string path = Path(virtualPath, context);
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(path), true);
        }

        /// <summary>
        /// </summary>
        public virtual string Path(string absolutePath, BundleContext context)
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