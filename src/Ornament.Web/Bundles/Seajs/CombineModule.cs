using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Optimization;
using Ornament.Web.Bundles.Seajs.Modules;

namespace Ornament.Web.Bundles.Seajs
{
    public abstract class CombineModule : ISeajsModule
    {
        private ModuleCollection _modules;
        private string _physicalApplicationPath;

        protected CombineModule(string uniqueId, BundleContext context, bool isCombine)
        {
            if (uniqueId.StartsWith("/"))
            {
                uniqueId = "~" + uniqueId;
            }
            UniqueId = uniqueId;
            Context = context;
            IsCombine = isCombine;
        }

        public string PhysicPath { get; set; }

        /// <summary>
        /// </summary>
        public BundleContext Context { get; set; }


        /// <summary>
        ///     当前这个Module依赖的子module
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }

        /// <summary>
        /// </summary>
        private string PhysicalApplicationPath
        {
            get
            {
                return _physicalApplicationPath ??
                       (_physicalApplicationPath = (Context.HttpContext.Request.PhysicalApplicationPath ?? ""));
            }
        }

        /// <summary>
        /// </summary>
        public abstract string Content { get; }

        /// <summary>
        /// </summary>
        public virtual string Path
        {
            get
            {
                Bundle bundle = BundleTable.Bundles.GetBundleFor(UniqueId);
                if (bundle != null)
                {
                    BundleFile a = bundle.EnumerateFiles(Context).First();
                    return a.IncludedVirtualPath
                        .Replace(PhysicalApplicationPath, "~/")
                        .Replace('\\', '/');
                }
                return UniqueId;
            }
        }

        /// <summary>
        /// </summary>
        public string UniqueId { get; set; }

        /// <summary>
        ///     是否合并
        /// </summary>
        public bool IsCombine { get; protected set; }


        public string BuildContent(ModualIdSets moduleIdList, ModuleCollection referencModule)
        {
            return BuildContent(Content, moduleIdList, referencModule);
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="moduleIdList"></param>
        /// <param name="referencModule"></param>
        /// <returns></returns>
        protected string BuildContent(string content, ModualIdSets moduleIdList, ModuleCollection referencModule)
        {
            List<CombineModule> combineFiles = CollectRequire(ref content, moduleIdList, referencModule);


            //Build Define Header 
            StringBuilder result = RebuildDefinedHeader(content, moduleIdList);

            //添加合并文件的内容
            CombineRequirePart(result, combineFiles, moduleIdList, referencModule);
            return result.ToString();
        }

        /// <summary>
        ///     合并Require部分
        /// </summary>
        /// <param name="result"></param>
        /// <param name="combineFiles"></param>
        /// <param name="moduleIdList"></param>
        /// <param name="referencModule"></param>
        protected virtual void CombineRequirePart(StringBuilder result, List<CombineModule> combineFiles,
            ModualIdSets moduleIdList, ModuleCollection referencModule)
        {
            foreach (CombineModule combineFile in combineFiles)
            {
                string subContent = combineFile.BuildContent(moduleIdList, referencModule);
                result.Append(";\r\n")
                    .Append("//")
                    .Append(moduleIdList.GetModualId(combineFile))
                    .Append(";\r\n")
                    .Append(subContent);
            }
        }

        /// <summary>
        ///     重新整理defined 这一段代码，并且返回defined所包含的所有内容。
        /// </summary>
        /// <param name="content"></param>
        /// <param name="moduleIdList"></param>
        /// <returns></returns>
        protected virtual StringBuilder RebuildDefinedHeader(string content, ModualIdSets moduleIdList)
        {
            var result = new StringBuilder();
            string newDefined = BuildDefine(moduleIdList);
            result.Insert(0, Regex.Replace(content, @"define\(", match => newDefined));
            return result;
        }

        protected virtual string BuildDefine(ModualIdSets moduleIdList)
        {
            return String.Format("define(\"{0}\",[\"{1}\"],", 
                GetOutputModuleId(moduleIdList),
                String.Join("\",\"", ReferenceModules.RequrestIds(moduleIdList)));
        }

        protected virtual string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return moduleIdList.GetModualId(this);
        }

        /// <summary>
        ///     查找文件中引用模块或者合并模块
        /// </summary>
        /// <param name="content"></param>
        /// <param name="combinedModuleSet">已经被combine的Modules</param>
        /// <param name="referencModule"></param>
        /// <returns>返回需要被combie module的Moudle</returns>
        protected virtual List<CombineModule> CollectRequire(ref string content,
            ModualIdSets combinedModuleSet,
            ModuleCollection referencModule)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用


            var result = new List<CombineModule>();

            content = Regex.Replace(content, @"require\((.+?)\)", match =>
            {
                string replacement = match.Groups[1].Value
                    .TrimStart('\"', '\'')
                    .TrimEnd('\"', '\'');
                string srcRequireModualId = replacement; //.ToLower();
                bool combinedHere = false;
                ISeajsModule modual = GetModual(srcRequireModualId, combinedModuleSet, referencModule,
                    out combinedHere);
                ReferenceModules.Add(modual);

                var combineModual = modual as CombineModule;
                if (combineModual != null)
                {
                    if (combinedHere)
                    {
                        result.Add(combineModual);
                    }
                    return match.Value.Replace(replacement, combinedModuleSet.GetModualId(combineModual));
                }
                return match.Value;
            });


            return result;
        }

        protected virtual string MapToPhysicPath(string virtualPath)
        {
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(Path),
                true);
        }

        protected virtual string ToAbstrVirtualPaht(string virtualPath)
        {
            if (virtualPath.StartsWith("/"))
            {
                return "~" + virtualPath;
            }
            string dir = VirtualPathUtility.GetDirectory(Path);
            string result = VirtualPathUtility.Combine(dir, virtualPath);

            return result;
        }

        /// <summary>
        ///     根据文件内容获取module对象.
        /// </summary>
        /// <param name="srcRequireModualId"></param>
        /// <param name="combinedModuleSet"></param>
        /// <param name="globalReferenceModules"></param>
        /// <param name="combinedHere"> 获取到的 return 模块是否需要合并</param>
        /// <returns></returns>
        protected virtual ISeajsModule GetModual(string srcRequireModualId, ModualIdSets combinedModuleSet,
            ModuleCollection globalReferenceModules, out bool combinedHere)
        {
            if (srcRequireModualId.Contains("/") || srcRequireModualId.Contains(".js"))
            {
                srcRequireModualId = ToAbstrVirtualPaht(srcRequireModualId);
                combinedHere = false;
                if (globalReferenceModules.Contains(srcRequireModualId))
                {
                    ISeajsModule module = globalReferenceModules[srcRequireModualId];
                    if (!combinedModuleSet.Contains(srcRequireModualId))
                    {
                        combinedModuleSet.Add(module);
                    }

                    return module;
                }

                if (combinedModuleSet.Contains(srcRequireModualId))
                {
                    var module = combinedModuleSet[srcRequireModualId];
                    if (!srcRequireModualId.Contains(module .UniqueId))
                    {
                        combinedModuleSet.Add(module);
                    }
                }

                if (MainWebFileCombine.IsInMainFolder(srcRequireModualId))
                {
                    ISeajsModule module = new MainWebFileCombine(srcRequireModualId, Context, IsCombine);
                    combinedModuleSet.Add(module);
                    combinedHere = true;
                    return module;
                }

                string physicPath = MapToPhysicPath(srcRequireModualId); //it will be use in physicId

                if (File.Exists(physicPath))
                {
                    //这是一个物理路径合并模块
                    if (combinedModuleSet.Contains(physicPath))
                    {
                        return combinedModuleSet[physicPath];
                    }
                    //创建合并Module js
                    var module = new FileCombineModule(Context, srcRequireModualId, IsCombine, physicPath);
                    combinedModuleSet.Add(module);
                    combinedHere = true;
                    return module;
                }
                if (CombineModuleAssembly.IsAssemblyCombineModules(srcRequireModualId))
                {
                    var module = new CombineModuleAssembly(Context, srcRequireModualId, IsCombine);
                    combinedModuleSet.Add(module);
                    combinedHere = true;
                    return module;
                }
            }
            //普通一个的引用js
            var subModule = new ReferenceModule(srcRequireModualId);
            if (!combinedModuleSet.Contains(subModule.UniqueId))
            {
                combinedModuleSet.Add(subModule);
            }
            combinedHere = false;
            return subModule;
        }
    }
}