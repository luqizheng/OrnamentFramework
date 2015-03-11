using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules.Readers
{
    public class FileCombineModuleReader : ICombineModuleReader
    {
        public bool Build(string scriptPath, ModuleFactory context, ScriptModule parent, out CombineModule module)
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
        }

        protected virtual string GetContent(ScriptModule module, BundleContext context)
        {
            Bundle bundle = BundleTable.Bundles.GetBundleFor(module.RequireId);
            if (bundle == null)
                return null;
            return GetContent(bundle, context, module.AbsolutePath);
        }

        protected virtual string GetContent(Bundle bundle, BundleContext context, string absolutePath)
        {
            BundleFile c = bundle.EnumerateFiles(context).FirstOrDefault();
            if (c == null)
            {
                throw new ArgumentNullException(absolutePath, absolutePath + " not a bundle file ");
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

        protected CombineModule Create(string rquireId, BundleContext context, ScriptModule parent)
        {
            var result = new CombineModule(rquireId)
            {
                AbsolutePath = ToAbstrVirtualPath(rquireId, parent.AbsolutePath)
            };
            return result;
        }

        protected virtual string ToAbstrVirtualPath(string virtualPath, string parentPath)
        {
            if (virtualPath.StartsWith("/"))
            {
                return "~" + virtualPath;
            }
            string dir = VirtualPathUtility.GetDirectory(parentPath);
            string result = VirtualPathUtility.Combine(dir, virtualPath);

            return result;
        }
    }
}