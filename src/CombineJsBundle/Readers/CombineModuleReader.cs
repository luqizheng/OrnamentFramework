using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules.Readers
{
    public abstract class CombineModuleReader : ICombineModuleReader
    {
        public bool Build(string scriptPath, ModuleFactory context, ScriptModule parent, out CombineModule module)
        {
            module = Create(scriptPath, context.Context, parent);
            context.Repository.Add(module);
            var content = GetContent(module, context.Context);


            if (content != null && !string.IsNullOrEmpty(module.OutputId))
            {
                var outputId = module.OutputId;
                content = Regex.Replace(content, @"[^.]\s*define\s*\(\s*", s => string.Format("{0}'{1}',", s.Value, outputId));
                module.Content = content;
                return true;
            }
            context.Repository.Remove(module);
            module = null;
            return false;
        }



        protected virtual string GetContent(ScriptModule module, BundleContext context)
        {
            Bundle bundle = BundleTable.Bundles.GetBundleFor(module.AbsolutePath);
            if (bundle == null)
                return null;
            return GetContent(bundle, context, module);
        }

        protected virtual CombineModule Create(string rquireId, BundleContext context, ScriptModule parent)
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

        protected abstract string GetContent(Bundle bundle, BundleContext context, ScriptModule absolutePath);
    }
}