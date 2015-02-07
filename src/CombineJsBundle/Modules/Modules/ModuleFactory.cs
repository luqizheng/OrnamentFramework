using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;
using CombineJs.Modules.Modules.CombineModuleFactories;
using SeajsBundles.Seajs;
using SeajsBundles.Seajs.Modules;

namespace CombineJs.Modules.Modules
{
    public class ModuleFactory
    {
        public static ModuleFactory Instance = new ModuleFactory();

        private readonly DefaultModuleFactory _defaultModuleFactory = new DefaultModuleFactory();
        private readonly IList<IModuleFactory> _list = new List<IModuleFactory>();
        private ModuleCollection _referenceModules;

        private ModuleFactory()
        {
            Add(new GlobalReferenceModuleFactory(), 0);
            Add(new BundleFileModuleFactory(), 1);
        }

        /// <summary>
        ///     必须为 reference module 的 module,保存在这里的module会自动跳过过
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _referenceModules ?? (_referenceModules = new ModuleCollection()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="facotry"></param>
        /// <param name="index">0 is the best</param>
        public void Add(IModuleFactory facotry, int index)
        {
            if (facotry == null)
                throw new ArgumentNullException("facotry");
            _list.Insert(index, facotry);
        }

        /// <summary>
        /// </summary>
        /// <param name="refereId"></param>
        /// <param name="context"></param>
        /// <param name="combine"></param>
        /// <param name="parentModule"></param>
        /// <returns></returns>
        public IScriptModule Create(string refereId,
            BundleContext context, bool combine,
            IScriptModule parentModule)
        {

            IScriptModule result = null;
            if (combine)
            {
                if (refereId.Contains("/") || refereId.EndsWith(".js"))
                {
                    string abstrVirtualPath = ToAbstrVirtualPath(refereId, parentModule.AbsolutePath);

                    foreach (IModuleFactory item in _list)
                    {
                        if (item.IsModule(abstrVirtualPath, parentModule))
                        {
                            result = item.Build(refereId, context, combine, parentModule);
                            result.AbsolutePath = abstrVirtualPath;
                            break;
                        }
                    }
                }
            }

            return result ?? (_defaultModuleFactory.Build(refereId, context, combine, parentModule));
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