using System;
using System.Collections.Generic;
using System.Web.Optimization;
using CombineJs.Modules.Modules.Readers;

namespace CombineJs.Modules.Modules
{
    public class ModuleFactory
    {
        private static readonly IList<ICombineModuleReader> List = new List<ICombineModuleReader>();
        private ModuleCollection _referenceModules;

        static ModuleFactory()
        {
            List.Add(new BundleFileCombineModuleReader());
        }

        public ModuleFactory(BundleContext context)
        {
            Context = context;
        }

        public BundleContext Context { get; set; }

        /// <summary>
        ///     必须为 reference module 的 module,保存在这里的module会自动跳过过
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _referenceModules ?? (_referenceModules = new ModuleCollection()); }
        }

        public static ModuleFactory Create(BundleContext context)
        {
            return new ModuleFactory(context);
        }

        /// <summary>
        /// </summary>
        /// <param name="facotry"></param>
        /// <param name="index">0 is the best</param>
        public static void Add(ICombineModuleReader facotry, int index)
        {
            if (facotry == null)
                throw new ArgumentNullException("facotry");
            List.Insert(index, facotry);
        }

        public string Build(string path, string content)
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="refereId"></param>
        /// <param name="context"></param>
        /// <param name="combine"></param>
        /// <param name="parentModule"></param>
        /// <returns></returns>
        public ScriptModule Create(string refereId,
            BundleContext context, bool combine,
            ScriptModule parentModule)
        {
            if (combine)
            {
                if (refereId.Contains("/") || refereId.EndsWith(".js"))
                {
                    //string abstrVirtualPath = ToAbstrVirtualPath(refereId, parentModule.AbsolutePath);

                    foreach (ICombineModuleReader item in List)
                    {
                        CombineModule mouModule;
                        if (item.Build(refereId, this, parentModule, out mouModule))
                        {
                            break;
                        }
                    }
                }
            }

            return null;
        }
    }
}