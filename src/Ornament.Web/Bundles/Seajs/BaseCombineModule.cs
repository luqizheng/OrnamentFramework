using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    public abstract class BaseCombineModule : ReferenceModule
    {
        private ModuleCollection _modules;

        protected BaseCombineModule(BundleContext context, string uniquireId, string virtualPath, bool combine) :
            base(uniquireId)
        {
            Context = context;
            VirtualPath = virtualPath;
            Combine = combine;
        }

        public BundleContext Context { get; set; }
        public string VirtualPath { get; set; }
        public bool Combine { get; set; }

        /// <summary>
        ///     当前这个Module依赖的子module
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }

        protected virtual string MapPath(string virtualPath)
        {
            string rootVirtualPath =
                UniqueId.ToLower()
                        .Replace(HttpContext.Current.Request.PhysicalApplicationPath.ToLower(), "~/")
                        .Replace('\\', '/');
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(rootVirtualPath),
                                                       true);
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="idSets">已经被combine的Modules</param>
        /// <param name="referencModule"></param>
        /// <returns>返回需要被combie module的Moudle</returns>
        protected virtual List<CombineModule> CollectRequire(ref string content,
                                                             ModualIdSets idSets,
                                                             ModuleCollection referencModule)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用

            var result = new List<CombineModule>();

            content = Regex.Replace(content, @"require\((.+?)\)", match =>
                {
                    string replacement = match.Groups[1].Value
                                                        .TrimStart('\"', '\'')
                                                        .TrimEnd('\"', '\'');
                    string srcRequireModualId = replacement.ToLower();
                    bool combinedHere = false;
                    ReferenceModule modual = GetModual(srcRequireModualId, idSets, referencModule, out combinedHere);
                    ReferenceModules.Add(modual);

                    var combineModual = modual as CombineModule;
                    if (combineModual != null)
                    {
                        if (combinedHere)
                        {
                            result.Add(combineModual);
                        }
                        return match.Value.Replace(replacement, idSets.GetModualId(combineModual));
                    }
                    return match.Value;
                });


            return result;
        }

        /// <summary>
        /// </summary>
        /// <param name="srcRequireModualId"></param>
        /// <param name="moduleIdSets"></param>
        /// <param name="globalReferenceModules"></param>
        /// <param name="combinedHere"> 获取到的 return 模块是否需要合并</param>
        /// <returns></returns>
        protected virtual ReferenceModule GetModual(string srcRequireModualId, ModualIdSets moduleIdSets,
                                                    ModuleCollection globalReferenceModules, out bool combinedHere)
        {
            combinedHere = false;
            if (globalReferenceModules.Contains(srcRequireModualId))
            {
                ReferenceModule a = globalReferenceModules[srcRequireModualId];
                if (!moduleIdSets.Contains(srcRequireModualId))
                {
                    moduleIdSets.Add(a);
                }

                return a;
            }

            if (moduleIdSets.Contains(srcRequireModualId))
            {
                return moduleIdSets[srcRequireModualId];
            }
            string physicPath = MapPath(srcRequireModualId).ToLower(); //it will be use in physicId

            if (File.Exists(physicPath))
            {
                if (moduleIdSets.Contains(physicPath))
                {
                    return moduleIdSets[physicPath];
                }
                //从这里合并为绝对的虚拟路径
                string fullpath =
                    UniqueId.ToLower()
                            .Replace(HttpContext.Current.Request.PhysicalApplicationPath.ToLower(), "/")
                            .Replace("\\", "/");
                fullpath = VirtualPathUtility.Combine(fullpath, srcRequireModualId);

                //引用js
                var sub = new CombineModule(this.Context, physicPath, fullpath, Combine);
                moduleIdSets.Add(sub);
                combinedHere = true;
                return sub;
            }
            //普通一个的引用js
            var subModule = new ReferenceModule(srcRequireModualId);
            moduleIdSets.Add(subModule);
            return subModule;
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="moduleIdList"></param>
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
            return String.Format("define(\"{0}\",[\"{1}\"],", GetOutputModuleId(moduleIdList),
                                 String.Join("\",\"", ReferenceModules.RequrestIds(moduleIdList)));
        }


        protected virtual string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return moduleIdList.GetModualId(this);
        }
    }
}