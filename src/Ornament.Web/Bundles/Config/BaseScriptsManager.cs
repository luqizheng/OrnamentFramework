using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using Iesi.Collections;
using Qi;
using Qi.IO;

namespace Ornament.Web.Bundles.Config
{
    public abstract class BaseScriptsManager
    {
        
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
            if (!regPath.EndsWith("/"))
            {
                regPath += "/";
            }
            RegPathPrefix = regPath;
            LogFile = "/log/" + (new DirectoryInfo(searchDirPath)).Name + ".log";
        }

        protected virtual string ExtendFileName
        {
            get { return "*.js"; }
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
        public string RegPathPrefix { get; private set; }

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
                    //string virtualFolderName = VirtualPathUtility.Combine(bundlePath, subFolder.Name + ".js");
                    var aa = ManagerSetting.Split(files, VirtualPathUtility.Combine(bundlePath, subFolder.Name));
                    foreach (var asdf in aa)
                    {
                        Handle(bundles, asdf.BundleName, log, asdf.FileStrings.ToArray());
                    }
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

            var files = (new DirectoryInfo(physicPath).GetFilesEx(this.ExtendFileName));
            string virtualPath = ToVirtualPath(physicPath);
            foreach (var fileInfo in files)
            {
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
            return folder.GetFilesEx(this.ExtendFileName).Select(file => ToVirtualPath(file.FullName)).ToArray();
        }

        protected abstract void Handle(BundleCollection bundles, string bundlePath, StreamWriter logWriter, params string[] includeVirtualPathes);

        private class ManagerSetting
        {
            public string BundleName { get; set; }
            private List<string> _fileStrings;
            public List<string> FileStrings
            {
                get { return _fileStrings ?? (_fileStrings = new List<string>()); }
            }

            public static ManagerSetting[] Split(string[] files, string suggestBundleName)
            {
                var result = new System.Collections.Generic.Dictionary<string, ManagerSetting>();

                foreach (var file in files)
                {
                    var fileInfo = new FileInfo(file);
                    ManagerSetting setting;
                    if (!result.ContainsKey(fileInfo.Extension))
                    {
                        setting = new ManagerSetting()
                        {
                            BundleName = suggestBundleName + fileInfo.Extension
                        };
                        result.Add(fileInfo.Extension, setting);
                    }
                    else
                    {
                        setting = result[fileInfo.Extension];
                    }

                    setting.FileStrings.Add(file);
                }
                return result.Values.ToArray();
            }
        }

    }
}