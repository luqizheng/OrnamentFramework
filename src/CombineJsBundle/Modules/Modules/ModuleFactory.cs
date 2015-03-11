using System;
using System.Collections.Generic;
using System.Web.Optimization;
using CombineJs.Modules.Modules.Readers;

namespace CombineJs.Modules.Modules
{
    public class ModuleFactory
    {
        private static readonly IList<ICombineModuleReader> List = new List<ICombineModuleReader>();
        private readonly ModuleRepository _moduleRepository;
        private ModuleCollection _referenceModules;

        static ModuleFactory()
        {
            List.Add(new FileCombineModuleReader());
        }

        public ModuleFactory(BundleContext context, bool combine)
        {
            Context = context;
            Combine = combine;
            _moduleRepository = new ModuleRepository();
        }

        internal ModuleRepository Repository
        {
            get { return _moduleRepository; }
        }

        public BundleContext Context { get; set; }
        public bool Combine { get; set; }

        /// <summary>
        ///     必须为 reference module 的 module,保存在这里的module会自动跳过过
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _referenceModules ?? (_referenceModules = new ModuleCollection()); }
        }

        public static ModuleFactory Create(BundleContext context, bool combine)
        {
            if (context == null) throw new ArgumentNullException("context");
            return new ModuleFactory(context, combine);
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
            if (Combine)
            {
                var script = new ScriptModule();
                script.RequireId = path;
                script.AbsolutePath = path;
                script.OutputId = path;

                return ContentAnalyzer.CreateContent(this, content, script);
            }
            return content;
        }

        /// <summary>
        /// </summary>
        /// <param name="refereId"></param>
        /// <param name="parentModule"></param>
        /// <returns></returns>
        internal ScriptModule Create(string refereId, ScriptModule parentModule)
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


            return null;
        }
    }
}