using System;
using System.Collections.Generic;
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
        /// <param name="physicPath"></param>
        /// <returns></returns>
        protected static string ToVirtualPath(string physicPath)
        {
            return physicPath.Replace(ApplicationHelper.PhysicalApplicationPath, "~/")
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

                if (IsCombine(subFolder, log))
                {
                    string[] files = GetCombineFolderFiles(subFolder);
                    string virtualFolderName = VirtualPathUtility.Combine(bundlePath, subFolder.Name + ".js");
                    Handle(bundles, virtualFolderName, log, files);
                }
                else
                {
                    string subVirtualFolder = VirtualPathUtility.Combine(bundlePath, subFolder.Name) + "/";
                    HandleFiles(bundles, subFolder.FullName, subVirtualFolder, log);
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
                string bundlePath = VirtualPathUtility.Combine(bundleName, fileInfo.Name);
                Handle(bundles, bundlePath, log, subVirtualPath);
            }

            HandleDirectories(bundles, physicPath, bundleName, log);
        }

        /// <summary>
        ///     folder 里面是否需要合并。
        /// </summary>
        /// <param name="directoryInfo"></param>
        /// <param name="log"></param>
        /// <returns>true 会读取所有文件并且，执行Bundle注册，否则里面的文件会一个bundle</returns>
        protected abstract bool IsCombine(DirectoryInfo directoryInfo, StreamWriter log);

        protected virtual string[] GetCombineFolderFiles(DirectoryInfo folder)
        {
            var list = new List<String>();
            foreach (FileInfo file in folder.GetFiles("*.js"))
            {
                list.Add(ToVirtualPath(file.FullName));
            }
            return list.ToArray();
        }


        protected abstract void Handle(BundleCollection bundles, string bundlePath, StreamWriter logWriter,
            params string[] includeVirtualPathes);

        /*
                /// <summary>
                /// </summary>
                /// <param name="bundles"></param>
                /// <param name="physicPath"></param>
                /// <param name="virtualPath"></param>
                /// <param name="logWriter"></param>
                /// <returns>返回true，继续处理folder里面的文件</returns>
                protected abstract bool HandleFolder(BundleCollection bundles,
                    DirectoryInfo physicPath,
                    string virtualPath, StreamWriter logWriter);*/
    }
}