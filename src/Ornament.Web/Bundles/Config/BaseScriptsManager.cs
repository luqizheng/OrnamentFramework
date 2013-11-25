using System;
using System.IO;
using System.Web;
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
            if (!regPath.StartsWith("~/"))
                throw new ArgumentOutOfRangeException("regPath", "pease start with ~/ ");

            _searchDirPath = searchDirPath;
            _regPath = regPath;
            LogFile = "/log/" + (new DirectoryInfo(searchDirPath)).Name + ".log";
        }

        /// <summary>
        /// </summary>
        public string LogFile { get; set; }

        /// <summary>
        /// </summary>
        public string DirectoryPath
        {
            get { return _searchDirPath; }
        }

        /// <summary>
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
                           .Replace(@"\", "/");
        }

        public void Handle(BundleCollection bundles)
        {
            using (var log = new StreamWriter(ApplicationHelper.MapPath(LogFile)))
            {
                string searchFolder = ApplicationHelper.MapPath(DirectoryPath);
                foreach (string physicPath in Directory.GetDirectories(searchFolder))
                {
                    HandleFiles(bundles, physicPath + "/",
                                VirtualPathUtility.Combine(RegPathPrefix, (new DirectoryInfo(physicPath)).Name) + "/",
                                log);
                }
            }
        }

        private void HandleDirectories(BundleCollection bundles, string physicPath, string bundlePath, StreamWriter log)
        {
            //处理目录
            string[] folders = Directory.GetDirectories(physicPath);
            foreach (string folderPath in folders)
            {
                var subFolder = new DirectoryInfo(folderPath);
                string virtualFolderName = ToVirtualPath(folderPath);
                if (HandleFolder(bundles, subFolder, virtualFolderName, log))
                {
                    HandleFiles(bundles, subFolder.FullName,
                                VirtualPathUtility.Combine(bundlePath, subFolder.Name) + "/", log);
                }
            }
        }

        protected virtual void HandleFiles(BundleCollection bundles, string physicPath, string bundleName,
                                           StreamWriter log)
        {
            //处理文件的

            string[] files = Directory.GetFiles(physicPath, "*.js");
            string virtualPath = ToVirtualPath(physicPath);
            foreach (string file in files)
            {
                var fileInfo = new FileInfo(file);
                string subVirtualPath = VirtualPathUtility.Combine(virtualPath, fileInfo.Name);
                string bundle = VirtualPathUtility.Combine(bundleName, fileInfo.Name);
                Handle(bundles, subVirtualPath, bundle, log);
            }

            HandleDirectories(bundles, physicPath, bundleName, log);
        }


        protected abstract void Handle(BundleCollection bundles, string virtualPath1,
                                       string bundlePath, StreamWriter logWriter);

        /// <summary>
        /// </summary>
        /// <param name="bundles"></param>
        /// <param name="physicPath"></param>
        /// <param name="virtualPath"></param>
        /// <param name="logWriter"></param>
        /// <returns>返回true，继续处理folder里面的文件</returns>
        protected abstract bool HandleFolder(BundleCollection bundles,
                                             DirectoryInfo physicPath,
                                             string virtualPath, StreamWriter logWriter);
    }
}