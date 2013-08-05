using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Ornament.Web.Bundles
{
    public class CombineSeajs
    {
        private readonly string _content;
        private readonly string _id;
        private readonly string _modelsbaseFilepath;
        private List<string> _existDefined;
        private string _rootPath;

        /// <summary>
        /// </summary>
        /// <param name="content">用于合并的内容</param>
        /// <param name="id">模块的Id</param>
        /// <param name="path">浏览器引用的路径</param>
        /// <param name="modelsbaseFilepath">业务模块所在的目录。如果发现Require的路径，和这个不同，就不需要合并</param>
        public CombineSeajs(string content, string id, string path, string modelsbaseFilepath)
        {
            _id = id;
            _modelsbaseFilepath = modelsbaseFilepath;
            if (!_modelsbaseFilepath.StartsWith("\""))
                _modelsbaseFilepath = "\"" + _modelsbaseFilepath;
            _rootPath = path;
            if (!_rootPath.EndsWith("/"))
                _rootPath += "/";

            _content = content;
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="id"></param>
        /// <param name="modelsbaseFilepath"></param>
        /// <param name="rootPath">主模块的路径</param>
        /// <param name="existDefined">已经被加载过的模块</param>
        private CombineSeajs(string content, string id, string modelsbaseFilepath, string rootPath,
                             List<string> existDefined)
            : this(content, id, rootPath, modelsbaseFilepath)
        {
            _existDefined = existDefined;

        }
        public string ModelId
        {
            get { return Path.Combine(_rootPath, _id).Replace("\\", "/"); }
        }
        public List<string> ExistDefined
        {
            get { return _existDefined ?? (_existDefined = new List<string>()); }
        }


        public string Processs()
        {
            string[] importPathes;
            IEnumerable<string> apis = CollectRequire(_content, out importPathes);
            var dependcyFiles = new List<string>();
            string newDefined = String.Format("define(\"{0}\",[\"{1}\"],", ModelId, String.Join("\",\"", importPathes));
            foreach (string dependcyFile in apis)
            {
                if (dependcyFile.StartsWith(_modelsbaseFilepath) && !ExistDefined.Contains(dependcyFile))
                {
                    dependcyFiles.Add(dependcyFile);
                }
            }

            StringBuilder childContent = BuidlChildItem(dependcyFiles, importPathes, _modelsbaseFilepath);
            childContent.Insert(0, Regex.Replace(_content, @"define\(", match => newDefined));
            return childContent.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="content"></param>
        /// <returns>return physica path of file store.</returns>
        private IEnumerable<string> CollectRequire(string content, out string[] importRequirePath)
        {

            MatchCollection s = Regex.Matches(content, @"require\((.+?)\)");
            var result = new List<string>();
            for (int i = 0; i < s.Count; i++)
            {
                result.Add(s[i].Groups[1].Value.ToLower().TrimStart('\"').TrimEnd('\"'));
            }
            importRequirePath = new string[result.Count];
            for (int i = 0; i < importRequirePath.Length; i++)
            {
                var file = new FileInfo(result[i]);
                importRequirePath[i] = Path.Combine(_rootPath, file.Name);
            }
            return result;
        }

        private StringBuilder BuidlChildItem(IList<string> files, string[] referenceFilePath, string modelsbaseFilepath)
        {
            var result = new StringBuilder();
            var queue = new Queue<string>(files);
            while (queue.Count != 0)
            {
                string physicPath = queue.Dequeue();
                string file = HttpContext.Current.Request.MapPath("~/" + physicPath);
                string id = (new FileInfo(file)).Name;
                using (var reader = new StreamReader(file))
                {
                    var r = new CombineSeajs(reader.ReadToEnd(), id, modelsbaseFilepath, _rootPath, ExistDefined);
                    result.Append(r.Processs());
                    this.ExistDefined.Add(physicPath);
                }
            }
            return result;
        }
    }
}