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
        private readonly string _rootPath;
        private List<string> _existDefined;

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
        /// <summary>
        /// 获取已经合并过的文件
        /// </summary>
        public List<string> CombinedFiles
        {
            get { return _existDefined ?? (_existDefined = new List<string>()); }
        }


        public string Processs()
        {
            string[] importPathes;
            string content = _content;
            IEnumerable<string> apis = CollectRequire(ref content, out importPathes);
            var dependcyFiles = new List<string>();
            string newDefined = String.Format("define(\"{0}\",[\"{1}\"],", ModelId, String.Join("\",\"", importPathes));
            foreach (string dependcyFile in apis)
            {
                if (dependcyFile.StartsWith(_modelsbaseFilepath) && !CombinedFiles.Contains(dependcyFile))
                {
                    dependcyFiles.Add(dependcyFile);
                }
            }

            StringBuilder childContent = BuidlChildItem(dependcyFiles, _modelsbaseFilepath);
            childContent.Insert(0, Regex.Replace(content, @"define\(", match => newDefined));
            return childContent.ToString();
        }

        /// <summary>
        /// </summary>
        /// <param name="content"></param>
        /// <param name="importRequirePath"></param>
        /// <returns>return physica path of file store.</returns>
        private IEnumerable<string> CollectRequire(ref string content, out string[] importRequirePath)
        {
            var importRequirePathList = new List<string>();
            var modelRequireFiles = new List<string>();
            content = Regex.Replace(content, @"require\((.+?)\)", s =>
            {
                string requireFile = s.Groups[1].Value.ToLower().TrimStart('\"').TrimEnd('\"');
                bool isModelFile = requireFile.StartsWith(_modelsbaseFilepath);
                if (isModelFile) //model file 需要合并
                {
                    modelRequireFiles.Add(requireFile);
                    var file = new FileInfo(requireFile);
                    string clientRequrePath = Path.Combine(_rootPath, file.Name);
                    importRequirePathList.Add(clientRequrePath);
                    return s.Value.ToLower().Replace(requireFile, clientRequrePath);
                }
                importRequirePathList.Add(requireFile); //普通requirefile，如Jquery等plugin，直接放到数组上面，无需要替换
                return s.Value;
            });

            importRequirePath = importRequirePathList.ToArray();
            return modelRequireFiles;
        }

        private StringBuilder BuidlChildItem(IEnumerable<string> files, string modelsbaseFilepath)
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
                    var r = new CombineSeajs(reader.ReadToEnd(), id, modelsbaseFilepath, _rootPath, CombinedFiles);
                    result.Append(r.Processs());
                    CombinedFiles.Add(physicPath);
                }
            }
            return result;
        }
    }
}