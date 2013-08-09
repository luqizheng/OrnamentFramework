﻿using System;
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

        protected BaseCombineModule(string uniquireId, string virtualPath) :
            base(uniquireId)
        {
            VirtualPath = virtualPath;
        }

        public string VirtualPath { get; set; }

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


                    /*ReferenceModule module;
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
                            return match.Value.Replace(replacement, combinedModule.GetModualId(refModule));
                        return match.Value;
                    }

                    ReferenceModule subModule = null;
                    string physicPath = MapPath(srcRequireModualId).ToLower(); //it will be use in physicId
                    if (File.Exists(physicPath))
                    {
                        if (!combinedModule.Contains(physicPath))
                        {
                            subModule = new CombineModule(physicPath, srcRequireModualId);
                            combinedModule.Add(subModule); //加入combined 变量，告诉后面遇到的不需要再合并。
                            result.Add((CombineModule) subModule);
                        }
                        else
                        {
                            subModule = combinedModule[physicPath];
                        }
                        Modules.Add(subModule);
                        return match.Value.Replace(replacement, combinedModule.GetModualId(subModule));
                    }

                    //路径下面，可能根部不存在该文件，如juqery，所以直接作为ReferenceModule使用
                    subModule = new ReferenceModule(srcRequireModualId);
                    Modules.Add(subModule);
                    combinedModule.Add(subModule);
                    return match.Value;*/
                });


            return result;
        }

        /// <summary>
        /// </summary>
        /// <param name="srcRequireModualId"></param>
        /// <param name="moduleIdSets"></param>
        /// <param name="globalReferenceModules"></param>
        /// <param name="combinedHere">是否需要合并</param>
        /// <returns></returns>
        private ReferenceModule GetModual(string srcRequireModualId, ModualIdSets moduleIdSets,
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
                //引用js
                var sub = new CombineModule(physicPath, srcRequireModualId);
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
            var result = new StringBuilder();

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
                                 String.Join("\",\"", ReferenceModules.RequrestIds(moduleIdList)));
        }


        protected virtual string GetOutputModuleId(ModualIdSets moduleIdList)
        {
            return moduleIdList.GetModualId(this);
        }
    }
}