using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CombineJs.Modules.Modules.Readers
{
    public class BundleFileCombineModuleReader : ScriptReader
    {
        //public bool Build(string abstractRequirePath,
        //    ModuleFactory facoFactory, ScriptModule parent, 
        //    out CombineModule module)
        //{
        //    module = null;
        //    if (!abstractRequirePath.StartsWith("~"))
        //    {
        //        abstractRequirePath = "~" + abstractRequirePath;
        //    }

        //    try
        //    {
        //        Bundle bundle = BundleTable.Bundles.GetBundleFor(abstractRequirePath);

        //        if (bundle != null)
        //        {
        //            module = new CombineModule(abstractRequirePath,context);
                    
        //            return true;
        //        }

        //        return false;
        //    }
        //    catch (ArgumentException)
        //    {
        //        return false;
        //    }
        //}

        protected override string GetContent(ScriptModule module, BundleContext context)
        {
           Bundle bundle = BundleTable.Bundles.GetBundleFor(module.RequireId);
            if (bundle == null)
                return null;
           var phyPath=GetContent(module.AbsolutePath,)
        }

        protected virtual string GetContent(Bundle bundle, BundleContext context,string absolutePath)
        {
           
            BundleFile c = bundle.EnumerateFiles(context).FirstOrDefault();
            if (c == null)
            {
                throw new ArgumentNullException(absolutePath, absolutePath + " not a bundle file ");
            }
            string file = c.VirtualFile.VirtualPath;
            file = MapToPhysicPath(file);
            using (var reader = new StreamReader(file))
            {
                return reader.ReadToEnd();
            }
        }
        
        protected virtual string MapToPhysicPath(string virtualPath)
        {
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(Path),true);
        }

        /// <summary>
        /// </summary>
        public virtual string Path(string AbsolutePath,BundleContext Context,)
        {
            

                Bundle bundle = BundleTable.Bundles.GetBundleFor(AbsolutePath);
                if (bundle != null)
                {
                    BundleFile a = bundle.EnumerateFiles(Context).First();
                    return a.IncludedVirtualPath
                        .Replace(Context.HttpContext.Request.PhysicalApplicationPath ?? "", "~/")
                        .Replace('\\', '/');
                }
                return OutputId;
            
        }
    }


}