using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using Qi;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    /// </summary>
    public class CombineModule : BaseModule
    {
      
        private ModuleCollection _modules;

        /// <summary>
        /// </summary>
        /// <param name="physicPath"></param>
        /// <param name="virtualPaht"></param>
        public CombineModule(string physicPath, string virtualPaht)
            : base(physicPath.ToLower())
        {
            PhysciPath = physicPath;
           // _request = new HttpRequest(physicPath, virtualPaht, "");
            ModuleId = virtualPaht;
        }

        public string PhysciPath { get; set; }

        /// <summary>
        ///     Id of Seajs moduleId and should be a virtualPath.
        /// </summary>
        public string ModuleId { get; set; }

        /// <summary>
        /// </summary>
        public ModuleCollection Modules
        {
            get { return _modules ?? (_modules = new ModuleCollection()); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="skipCombineModule"></param>
        /// <returns></returns>
        public virtual string BuildContent(ModuleCollection skipCombineModule)
        {
            string content = null;
            using (var reader = new StreamReader(PhysciPath))
            {
                content = reader.ReadToEnd();
            }
            return BuildContent(content, skipCombineModule);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="content"></param>
        /// <param name="skipCombineModule"></param>
        /// <returns></returns>
        public string BuildContent(string content, ModuleCollection skipCombineModule)
        {
            List<CombineModule> combineFiles = CollectRequire(ref content, skipCombineModule);
            var result = new StringBuilder(content);

            //Build Define Header 
            string newDefined = String.Format("define(\"{0}\",[\"{1}\"],", UniqueId,
                                              String.Join("\",\"", Modules.RequrestIds));
            result.Insert(0, Regex.Replace(content, @"define\(", match => newDefined));

            //添加合并文件的内容
            foreach (CombineModule combineFile in combineFiles)
            {
                string subContent = combineFile.BuildContent(skipCombineModule);
                result.Append(subContent);
            }
            return result.ToString();
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="skipCombinePath">已经被combine的Modules</param>
        /// <returns>返回需要被combie module的Moudle</returns>
        protected virtual List<CombineModule> CollectRequire(ref string content,
                                                             ModuleCollection skipCombinePath)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用

            var combineFiles = new List<CombineModule>();

            content = Regex.Replace(content, @"require\((.+?)\)", s =>
                {
                    /*
                     * 1）询问是否为合并模块。
                     *    a: 是合并模块
                     *      a.1: 是否包含在skipCombinePath
                     *      a.1.1: 不包含，需要合并。
                     *      a.1.2: 包含，设置为引用模块
                     *    b:是引用模块
                     */
                    .
                    string moduleId = s.Groups[1].Value.ToLower().TrimStart('\"', '\'').TrimEnd('\"', '\'');
                    string physicPath = VirtualPathUtility.ToAbsolute(vi)

                    BaseModule subModule = null;
                    if (!skipCombinePath.Contains(physicPath) && File.Exists(physicPath)) //文件存就需要合并
                    {
                        if (skipCombinePath.Contains(physicPath))
                        {
                            subModule = new CombineModule(physicPath, moduleId);
                            skipCombinePath.Add(subModule);
                            combineFiles.Add((CombineModule) subModule);
                        }
                        else
                        {
                            subModule = skipCombinePath[physicPath];
                        }
                    }
                    else
                    {
                        subModule = new ReferenceModule(moduleId);
                    }

                    Modules.Add(subModule);
                    return s.Value.Replace(moduleId, subModule.UniqueId);
                });


            return combineFiles;
        }
    }
}