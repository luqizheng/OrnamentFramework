using System;
using System.IO;
using System.Web.Optimization;
using Qi;

namespace Ornament.Web.Bundles.Config
{
    public abstract class BaseScriptsManager
    {
        private readonly string _regPath;
        private readonly string _searchDirPath;

        /// <summary>
        /// </summary>
        /// <param name="searchDirPath">查找js的路径目录</param>
        /// <param name="regPath">注册js的route prefix</param>
        protected BaseScriptsManager(string searchDirPath, string regPath)
        {
            if (searchDirPath == null)
                throw new ArgumentNullException("searchDirPath");
            if (regPath == null)
                throw new ArgumentNullException("regPath");

            _searchDirPath = searchDirPath;
            _regPath = regPath;
            LogFile = searchDirPath + ".log";
        }
        /// <summary>
        /// 
        /// </summary>
        public string LogFile { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string DirectoryPath
        {
            get { return _searchDirPath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string RegPathPrefix
        {
            get { return _regPath; }
        }

        /// <summary>
        ///     把物理路径改为虚拟路径
        /// </summary>
        /// <param name="fullPath"></param>
        /// <returns></returns>
        protected static string ToVirtualPath(string fullPath)
        {
            return fullPath.Replace(ApplicationHelper.PhysicalApplicationPath, "~/")
                           .Replace("////", "/");
        }

        public void Handle(BundleCollection bundles)
        {
            using (var log = new StreamWriter(ApplicationHelper.MapPath(LogFile)))
            {
                string searchFolder = ApplicationHelper.MapPath(DirectoryPath);
                foreach (string physicPath in Directory.GetDirectories(searchFolder))
                {
                    //处理文件的
                    string[] files = Directory.GetFiles(physicPath, "*.js");
                    string virtualPath = ToVirtualPath(physicPath);
                    foreach (string file in files)
                    {
                        var fileInfo = new FileInfo(file);
                        log.WriteLine("Handle {0},", fileInfo.FullName);
                        string bundleName = Path.Combine(RegPathPrefix, fileInfo.Name);
                        string subVirtualPath = Path.Combine(virtualPath, fileInfo.Name);
                        Handle(bundles, subVirtualPath, bundleName, log);
                    }

                    //处理目录
                    string[] folders = Directory.GetDirectories(physicPath);
                    foreach (string folderPath in folders)
                    {
                        var directInfo = new DirectoryInfo(folderPath);
                        string virtualFolderName = ToVirtualPath(folderPath);
                        HandleFolder(bundles, directInfo, virtualFolderName, log);
                    }
                }
            }
        }

        protected abstract void Handle(BundleCollection bundles, string virtualPath1,
                                       string bundlePath, StreamWriter logWriter);

        protected abstract bool HandleFolder(BundleCollection bundles,
                                             DirectoryInfo physicPath,
                                             string virtualPath, StreamWriter logWriter);
    }
}