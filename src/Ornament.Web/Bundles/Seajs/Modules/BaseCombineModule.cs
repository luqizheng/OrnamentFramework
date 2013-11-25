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
        private string _physicalApplicationPath;

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="uniquireId">合并模块的Id</param>
        /// <param name="virtualPath">虚拟路径</param>
        /// <param name="combine">是否进行合并</param>
        protected BaseCombineModule(BundleContext context, string uniquireId, string virtualPath, bool combine) :
            base(uniquireId)
        {
            Context = context;
            VirtualPath = virtualPath;
            Combine = combine;
        }


        public BundleContext Context { get; set; }

        /// <summary>
        ///     存放文件的虚拟路径.
        /// </summary>
        public string VirtualPath { get; set; }

        /// <summary>
        ///     是否合并
        /// </summary>
        public bool Combine { get; set; }

        /// <summary>
        ///     当前这个Module依赖的子module
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }

        private string PhysicalApplicationPath
        {
            get
            {
                return _physicalApplicationPath ??
                       (_physicalApplicationPath = (Context.HttpContext.Request.PhysicalApplicationPath ?? "").ToLower());
            }
        }

        protected virtual string MapPath(string virtualPath)
        {
            string rootVirtualPath =
                UniqueId.ToLower()
                        .Replace(PhysicalApplicationPath, "~/")
                        .Replace('\\', '/');
            return HttpContext.Current.Request.MapPath(virtualPath, VirtualPathUtility.GetDirectory(rootVirtualPath),
                                                       true);
        }

        /// <summary>
        ///     查找文件中引用模块或者合并模块
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
                    ISeajsModule modual = GetModual(srcRequireModualId, idSets, referencModule, out combinedHere);
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
        ///     根据文件内容获取module对象.
        /// </summary>
        /// <param name="srcRequireModualId"></param>
        /// <param name="moduleIdSets"></param>
        /// <param name="globalReferenceModules"></param>
        /// <param name="combinedHere"> 获取到的 return 模块是否需要合并</param>
        /// <returns></returns>
        protected virtual ISeajsModule GetModual(string srcRequireModualId, ModualIdSets moduleIdSets,
                                                 ModuleCollection globalReferenceModules, out bool combinedHere)
        {
            combinedHere = false;
            if (globalReferenceModules.Contains(srcRequireModualId))
            {
                ISeajsModule a = globalReferenceModules[srcRequireModualId];
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
                //这是一个物理路径合并模块
                if (moduleIdSets.Contains(physicPath))
                {
                    return moduleIdSets[physicPath];
                }
                //从这里合并为绝对的虚拟路径
                string fullpath =
                    UniqueId.ToLower()
                            .Replace(PhysicalApplicationPath, "/")
                            .Replace("\\", "/");
                fullpath = VirtualPathUtility.Combine(fullpath, srcRequireModualId);

                //创建合并Module js
                var sub = new CombineModule(Context, physicPath, fullpath, Combine);
                moduleIdSets.Add(sub);
                combinedHere = true;
                return sub;
            }
            if (CombineModuleAssembly.IsAssemblyCombineModules(srcRequireModualId))
            {
                var sub = new CombineModuleAssembly(Context, srcRequireModualId, srcRequireModualId, Combine);
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
        ///     根据路径检查是否为合并模块
        /// </summary>
        /// <param name="physicPath"></param>
        /// <param name="srcRequireModualId"></param>
        protected virtual void IsCombineModule(string physicPath, string srcRequireModualId)
        {
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