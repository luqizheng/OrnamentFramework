using System.IO;
using System.Web;
using System.Web.Optimization;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules.CombineModuleFactories
{
    public class FileCombineFactory : IModuleFactory
    {
        public ISeajsModule Build(string abstractRequirePath, BundleContext context, bool combine, ISeajsModule parent)
        {
            return new FileCombineModule(context, abstractRequirePath, combine,
                MapToPhysicPath(abstractRequirePath, parent));
        }

        public bool IsModule(string abstractRequirePath, ISeajsModule parentModule)
        {
            string physicPath = MapToPhysicPath(abstractRequirePath, parentModule);
            return File.Exists(physicPath);
        }

        protected virtual string MapToPhysicPath(string virtualPath, ISeajsModule prarneModule)
        {
            var parent = prarneModule as CombineModule;
            if (parent != null)
            {
                return HttpContext.Current.Request.MapPath(virtualPath,
                    VirtualPathUtility.GetDirectory(parent.AbsolutePath),
                    true);
            }
            return HttpContext.Current.Request.MapPath(virtualPath);
        }
    }
}