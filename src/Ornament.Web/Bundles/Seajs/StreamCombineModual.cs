using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Ornament.Web.Bundles.Seajs
{
    public class StreamCombineModual : ISeajsModule
    {
        public StreamCombineModual(string uniqueId)
        {
            this.UniqueId = uniqueId;
        }
        /// <summary>
        /// 
        /// </summary>
        public string UniqueId { get; set; }

        public string Content { get; set; }

        public virtual string BuildContent(ModualIdSets combinedModules, ModuleCollection referencModule)
        {

            return BuildContent(content, combinedModules, referencModule);
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
        private ModuleCollection _modules;
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

        /// <summary>
        ///     当前这个Module依赖的子module
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }
    }
}
