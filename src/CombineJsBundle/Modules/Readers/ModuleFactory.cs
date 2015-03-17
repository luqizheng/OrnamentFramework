using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Readers
{
    public class ModuleFactory
    {
        private ModuleCollection _referenceModules;
        private ModuleCollection _modules=new ModuleCollection();
        public ModuleFactory() : this(new ModuleCollection())
        {
        }

        public ModuleFactory(ModuleCollection referenceModules)
        {
            _referenceModules = referenceModules;
        }

        public ScriptModule Create(BundleContext context, string virtualPath)
        {
            var r = new ScriptModule
            {
                RequireId = virtualPath,
                AbsolutePath = ToAbstrVirtualPath(virtualPath, context.BundleVirtualPath)
            };

            return r;
        }

        public ScriptModule Create(BundleContext context, string virtualPath, ScriptModule pareModule)
        {
            var r = new ScriptModule
            {
                RequireId = virtualPath,
                AbsolutePath = ToAbstrVirtualPath(virtualPath, pareModule.AbsolutePath)
            };
            return r;
        }

        protected virtual string ToAbstrVirtualPath(string virtualPath, string path)
        {
            if (virtualPath.StartsWith("/"))
            {
                return "~" + virtualPath;
            }
            string dir = VirtualPathUtility.GetDirectory(path);
            string result = VirtualPathUtility.Combine(dir, virtualPath);

            return result;
        }
    }
}