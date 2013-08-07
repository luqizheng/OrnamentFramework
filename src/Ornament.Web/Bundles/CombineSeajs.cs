using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Ornament.Web.Bundles
{
    public class CombineSeajs
    {

        private SeajsModuleCollection _existDefined;
        /// <summary>
        /// </summary>
        /// <param name="virtualPath">浏览器引用的路径</param>
        /// <param name="combinePath">业务模块所在的目录。如果发现Require的路径，和这个不同，就不需要合并</param>
        public CombineSeajs(string virtualPath, string combinePath)
        {
            Modual = new SeajsModual(virtualPath.TrimStart('~'), combinePath);
        }

       
        private CombineSeajs(SeajsModual modual)
        {
            Modual = modual;
        }

        private SeajsModual Modual { get; set; }

        /// <summary>
        ///     获取已经合并过的文件
        /// </summary>
        public SeajsModuleCollection CombinedFiles
        {
            get { return _existDefined ?? (_existDefined = new SeajsModuleCollection()); }
        }


        public string Processs(string content)
        {
            SeajsModuleCollection dependFiles = new SeajsModuleCollection();
            var combineFiles = CollectRequire(ref content, dependFiles);
            string newDefined = String.Format("define(\"{0}\",[\"{1}\"],", Modual.Id, String.Join("\",\"", dependFiles.RequrestIds));


            StringBuilder childContent = BuidlChildItem(combineFiles);
            childContent.Insert(0, Regex.Replace(content, @"define\(", match => newDefined));
            return childContent.ToString();
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="dependFiles"></param>
        /// <returns>return physica path of file store.</returns>
        private SeajsModuleCollection CollectRequire(ref string content, SeajsModuleCollection dependFiles)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用

            var combineMode = new SeajsModuleCollection();

            content = Regex.Replace(content, @"require\((.+?)\)", s =>
            {
                string requireModel = s.Groups[1].Value.ToLower().TrimStart('\"', '\'').TrimEnd('\"', '\'');
                var modual = new SeajsModual(requireModel, this.Modual.CombinePath);
                dependFiles.Add(modual);
                if (modual.IsCombine) //model file 需要合并
                {
                    combineMode.Add(modual);
                    return s.Value.ToLower().Replace(requireModel, modual.Id);
                }
                return s.Value;
            });


            return combineMode;
        }

        private StringBuilder BuidlChildItem(SeajsModuleCollection files)
        {
            var result = new StringBuilder();
            var queue = new Queue<SeajsModual>(files);
            while (queue.Count != 0)
            {
                var modual = queue.Dequeue();


                if (!File.Exists(modual.PhysicPath))
                {
                    result.Append(string.Format("console.warn('can not find path {0} in {1}');", modual.PhysicPath, Modual.PhysicPath));
                    continue;
                }
                var combineSeajs = new CombineSeajs(modual);
                using (var reader = new StreamReader(modual.PhysicPath))
                {
                    result.Append(combineSeajs.Processs(reader.ReadToEnd()));
                    CombinedFiles.Add(modual);
                }
            }
            return result;
        }
    }
}