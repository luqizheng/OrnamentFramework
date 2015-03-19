using System.IO;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules.Readers
{
    public class ScriptReader : ICombineModuleReader
    {
        public bool Build(string scriptPath, ModuleFactory context, ScriptModule parent, out CombineModule module)
        {
            module = Create(scriptPath, context.Context, parent);
            module.Content = GetContent(module, context.Context);
            if (module.Content != null)
                return true;

            module = null;
            return false;
        }

        protected virtual string GetContent(ScriptModule module, BundleContext context)
        {
            string file = context.HttpContext.Request.MapPath(module.AbsolutePath);
            if (File.Exists(file))
            {
                using (var reader = new StreamReader(file))
                {
                    return reader.ReadToEnd();
                }
            }
            return null;
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