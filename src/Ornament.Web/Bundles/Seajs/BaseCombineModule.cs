using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Ornament.Web.Bundles.Seajs
{
    public abstract class BaseCombineModule : ReferenceModule
    {
        private ModuleCollection _modules;

        protected BaseCombineModule(string uniquireId) :
            base(uniquireId)
        {
        }

        /// <summary>
        ///     当前这个Module依赖的子module
        /// </summary>
        public ModuleCollection Modules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }

        protected string MapPath(string virtualPath)
        {
            return HttpContext.Current.Request.MapPath(virtualPath);
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="combinedModule">已经被combine的Modules</param>
        /// <param name="referencModule"></param>
        /// <returns>返回需要被combie module的Moudle</returns>
        protected virtual List<CombineModule> CollectRequire(ref string content,
                                                             ModualIdSets combinedModule,
                                                             ModuleCollection referencModule)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用

            var result = new List<CombineModule>();

            content = Regex.Replace(content, @"require\((.+?)\)", match =>
                {
                    /*
                     * 1）询问是否为合并模块。
                     *    a: 是合并模块
                     *      a.1: 是否包含在skipCombinePath
                     *      a.1.1: 不包含，需要合并。
                     *      a.1.2: 包含，设置为引用模块
                     *    b:是引用模块
                     */

                    string srcRequireModualId = match.Groups[1].Value.ToLower()
                                                               .TrimStart('\"', '\'')
                                                               .TrimEnd('\"', '\'');
                    ReferenceModule module;
                    if (referencModule.Contains(srcRequireModualId))
                    {
                        module = referencModule[srcRequireModualId];
                        Modules.Add(module);
                        combinedModule.Add(module);
                        return match.Value;
                    }

                    if (combinedModule.Contains(srcRequireModualId))
                    {
                        //无论是reference 或者 combineId，都不需要combine
                        ReferenceModule refModule = combinedModule[srcRequireModualId];
                        Modules.Add(refModule);
                        if (refModule is CombineModule)
                            return match.Value.Replace(srcRequireModualId, combinedModule.GetModualId(refModule));
                        return match.Value;
                    }

                    ReferenceModule subModule = null;
                    string physicPath = MapPath(srcRequireModualId).ToLower(); //it will be use in physicId
                    if (!combinedModule.Contains(physicPath) && File.Exists(physicPath))
                    {
                        subModule = new CombineModule(physicPath);
                        combinedModule.Add(subModule); //加入combined 变量，告诉后面遇到的不需要再合并。
                        result.Add((CombineModule)subModule);
                        Modules.Add(subModule);
                        return match.Value.Replace(srcRequireModualId, combinedModule.GetModualId(subModule));
                    }

                    //路径下面，可能根部不存在该文件，如juqery，所以直接作为ReferenceModule使用
                    subModule = new ReferenceModule(srcRequireModualId);
                    Modules.Add(subModule);
                    combinedModule.Add(subModule);
                    return match.Value;
                });


            return result;
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="moduleIdList"></param>
        /// <returns></returns>
        protected string BuildContent(string content, ModualIdSets moduleIdList, ModuleCollection referencModule)
        {
            List<CombineModule> combineFiles = CollectRequire(ref content, moduleIdList, referencModule);
            var result = new StringBuilder(content);

            //Build Define Header 
            string newDefined = BuildDefine(moduleIdList);
            result.Insert(0, Regex.Replace(content, @"define\(", match => newDefined));

            //添加合并文件的内容
            foreach (CombineModule combineFile in combineFiles)
            {
                string subContent = combineFile.BuildContent(moduleIdList, referencModule);
                result.Append(subContent);
            }
            return result.ToString();
        }

        protected string BuildDefine(ModualIdSets moduleIdList)
        {
            return String.Format("define(\"{0}\",[\"{1}\"],", GetOutputModuleId(moduleIdList),
                                            String.Join("\",\"", Modules.RequrestIds(moduleIdList)));
        }


        protected virtual string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return moduleIdList.GetModualId(this);
        }
    }
}