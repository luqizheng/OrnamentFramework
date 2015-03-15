﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using CombineJs.Modules.Modules;

namespace CombineJs.Modules
{
    public class CombineModule : ScriptModule
    {
        //private ModuleCollection _modules;

        ///// <summary>
        ///// </summary>
        ///// <param name="referId"></param>
        ///// <param name="context"></param>
        //public CombineModule(string referId)
        //{
        //    RequireId = referId;
        //}

        ///// <summary>
        /////     当前这个Module依赖的子module
        ///// </summary>
        //public ModuleCollection SubModules
        //{
        //    get { return _modules ?? (_modules = new ModuleCollection()); }
        //}


        public CombineModule(string requireId) : base(requireId)
        {
        }

        /// <summary>
        /// </summary>
        public string Content { get; set; }


        /*public string BuildContent(ModuleRepository moduleIdList)
        {
            return BuildContent(Content, moduleIdList);
        }*/

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="moduleIdList"></param>
        /// <returns></returns>
        /*protected string BuildContent(string content, ModuleRepository moduleIdList)
        {
            List<CombineModule> combineFiles = CollectRequire(ref content, moduleIdList);

            //Build Define Header 
            StringBuilder result = RebuildDefinedHeader(content, moduleIdList);

            //添加合并文件的内容
            CombineRequirePart(result, combineFiles, moduleIdList);
            return result.ToString();
        }*/

        ///// <summary>
        /////     合并Require部分
        ///// </summary>
        ///// <param name="result"></param>
        ///// <param name="combineFiles"></param>
        ///// <param name="moduleIdList"></param>
        //protected virtual void CombineRequirePart(StringBuilder result, List<CombineModule> combineFiles,
        //    ModuleRepository moduleIdList)
        //{
        //    foreach (CombineModule combineFile in combineFiles)
        //    {
        //        string subContent = combineFile.BuildContent(moduleIdList);
        //        result.Append(";\r\n")
        //            .Append("//")
        //            .Append(moduleIdList.GetModualId(combineFile))
        //            .Append(";\r\n")
        //            .Append(subContent);
        //    }
        //}

        ///// <summary>
        /////     重新整理defined 这一段代码，并且返回defined所包含的所有内容。
        ///// </summary>
        ///// <param name="content"></param>
        ///// <param name="moduleIdList"></param>
        ///// <returns></returns>
        //protected virtual StringBuilder RebuildDefinedHeader(string content, ModuleRepository moduleIdList)
        //{
        //    var result = new StringBuilder();
        //    string newDefined = BuildDefine(moduleIdList);
        //    result.Insert(0,
        //        Regex.Replace(content, @"^([ ;}\s]*define).*?\(.*?function", match => newDefined, RegexOptions.Multiline));
        //    return result;
        //}

        //protected virtual string BuildDefine(ModuleRepository moduleIdList)
        //{
        //    string id = moduleIdList.GetModualId(this);
        //    return String.Format("define(\"{0}\",[\"{1}\"],function",
        //        id,
        //        String.Join("\",\"", SubModules.RequrestIds(moduleIdList)));
        //}

        /// <summary>
        ///     查找文件中引用模块和合并模块
        /// </summary>
        /// <param name="content"></param>
        /// <param name="combinedModuleSet">已经被combine的Modules</param>
        /// <returns>返回需要被combie module的Moudle</returns>
        /*protected virtual List<CombineModule> CollectRequire(ref string content, ModuleRepository combinedModuleSet)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用


            var result = new List<CombineModule>();

            content = Regex.Replace(content, @"require\(\[*([\'\""\\.\/A-z0-9]+?)\]*[\),]", match =>
            {
                string[] replcements = match.Groups[1].Value
                    .TrimStart('\"', '\'', '[')
                    .TrimEnd('\"', '\'', ']').Split(',');
                var output = new List<string>();
                foreach (string replacement in replcements)
                {
                    string srcRequireModualId = replacement; //.ToLower();
                    ScriptModule modual = GetModual(srcRequireModualId, combinedModuleSet);
                    if (!SubModules.Contains(modual))
                    {
                        SubModules.Add(modual);
                    }
                    var combineModule = modual as CombineModule;
                    if (combineModule != null)
                    {
                        result.Add(combineModule);
                    }
                    output.Add("'" + modual.OutputId + "'");
                }
                string outputString = String.Join(",", output.ToArray());
                string reformat = string.Format("{0}", outputString);
                return match.ToString().Replace(match.Groups[1].Value, reformat);
            });


            return result;
        }*/

        /*
        /// <summary>
        ///     根据文件内容获取module对象.
        /// </summary>
        /// <param name="srcRequireModualId"></param>
        /// <param name="combinedModuleSet"></param>
        /// <returns></returns>
        protected virtual ScriptModule GetModual(string srcRequireModualId, ModuleRepository combinedModuleSet)
        {
            ScriptModule module = ModuleFactory.Instance.Create(srcRequireModualId, Context, IsCombine, this);
            if (!combinedModuleSet.Contains(module))
            {
                combinedModuleSet.Add(module);
            }
            else
            {
                module = combinedModuleSet.GetByAbsolutePath(module.AbsolutePath);
            }
#if DEBUG
            if (String.IsNullOrEmpty(module.OutputId))
            {
                throw new ArgumentException("combinedModuleSet.OutputId");
            }
#endif
            return module;
         
        }*/
    }
}