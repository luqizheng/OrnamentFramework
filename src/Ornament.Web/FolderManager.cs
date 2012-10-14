using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Qi.Draw;
using Qi.IO;

namespace Ornament.Web
{
    public class OrnamentFile
    {
        public string Name { get; set; }

        /// <summary>
        /// Local physic file fullpath.
        /// </summary>
        public string FullPath { get; internal set; }
    }

    public class OrnamentFolder : OrnamentFile
    {
    }

    public class FolderManager
    {
        private readonly string _subFile;

        private DirectoryInfo _privateFolder;
        public FolderManager(string fullDirPath)
        {
            if (string.IsNullOrEmpty(fullDirPath))
                throw new ArgumentNullException("fullDirPath");
            _subFile = fullDirPath;
        }

        public DirectoryInfo PrivateFolder
        {
            get
            {
                if (_privateFolder == null)
                {
                    _privateFolder = new DirectoryInfo(_subFile);
                    if (!_privateFolder.Exists)
                    {
                        _privateFolder.CreateEx();
                    }
                }
                return _privateFolder;
            }
        }

        public FileInfo Resize(string filepath, int maxWidth, int maxHeight)
        {
            var a = new ResizePic
                {
                    MaxHeight = maxWidth,
                    MaxWidth = maxWidth
                };
            var src = new FileInfo(Path.Combine(PrivateFolder.FullName, filepath.TrimStart('/').TrimStart('\\')));
            var dir = new DirectoryInfo(Path.Combine(src.Directory.FullName, "mini"));
            if (!dir.Exists)
            {
                dir.CreateEx();
            }
            string targert = Path.Combine(dir.FullName, src.Name);
            a.Resize(src.FullName, Path.Combine(dir.FullName, src.Name));
            return new FileInfo(targert);
        }

        public IList<OrnamentFolder> ListFolder(string folderName)
        {
            DirectoryInfo dir = GetSubFolder(folderName);
            return (from file in dir.GetDirectories()
                    select new OrnamentFolder
                        {
                            Name = file.Name,
                            FullPath = file.FullName.Replace(PrivateFolder.FullName, "").Replace("\\", "/")
                        }).ToList();
        }

        private DirectoryInfo GetSubFolder(string folderName)
        {
            folderName = folderName ?? "";
            folderName = folderName.TrimStart('/').TrimStart('\\');
            DirectoryInfo dir = null;
            if (!String.IsNullOrEmpty(folderName) && folderName != "/")
            {
                dir = new DirectoryInfo(Path.Combine(PrivateFolder.FullName, folderName));
            }
            else
            {
                dir = new DirectoryInfo(PrivateFolder.FullName);
            }
            return dir;
        }

        public List<OrnamentFile> List(string folderName)
        {
            DirectoryInfo dir = GetSubFolder(folderName);
            return (from file in dir.GetFiles()
                    select new OrnamentFile
                        {
                            Name = file.Name,
                            FullPath = file.FullName.Replace(PrivateFolder.FullName, "").Replace("\\", "/")
                        }).ToList();
        }

        public string SaveAs(HttpPostedFileBase file, string folderName)
        {
            var dir = this.GetSubFolder(folderName);

            string expectFilePath = Path.Combine(dir.FullName, file.FileName);
            string actualFilePath = GetActualFileName(expectFilePath);
            file.SaveAs(actualFilePath);
            return PrivateFolder + (new FileInfo(actualFilePath)).Name;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="srcWebPath">web path like ~/Files/Files.png</param>
        /// <param name="targetFolder">web path link ~/Files/Files/</param>
        public string CopyTo(string srcWebPath, string targetFolder)
        {
            string src = srcWebPath;
            var tar = new DirectoryInfo(targetFolder);
            tar.CreateEx();

            var srcFile = new FileInfo(src);

            string targetFile = Path.Combine(tar.FullName, tar.Name);
            string actualFilePath = GetActualFileName(targetFile);

            srcFile.CopyTo(actualFilePath);
            return Path.Combine(targetFolder, (new FileInfo(actualFilePath)).Name);
        }

        public static string GetActualFileName(string expectFilePath)
        {
            string actualFilePath = expectFilePath;
            int i = 0;
            while (File.Exists(actualFilePath))
            {
                int post = actualFilePath.LastIndexOf(".", System.StringComparison.Ordinal);
                actualFilePath = post == -1
                                     ? actualFilePath + "(" + i + ")"
                                     : actualFilePath.Substring(0, post) + "(" + i + ")" +
                                       actualFilePath.Substring(post);
                i++;
            }
            return actualFilePath;
        }

        public FileInfo GetFile(string filePath)
        {
            string file = Path.Combine(PrivateFolder.FullName, filePath.TrimStart('/').TrimStart('\\'));
            return new FileInfo(file);
        }

        public void Delete(string file)
        {
            file = Path.Combine(PrivateFolder.FullName, file.TrimStart('/').TrimStart('\\'));
            if (File.Exists(file))
                File.Delete(file);
        }
        public void DeleteFolder(string folder)
        {
            var file = Path.Combine(PrivateFolder.FullName, folder.TrimStart('/').TrimStart('\\'));
            if (Directory.Exists(file))
                Directory.Delete(file);
        }

        public bool CreateFolder(string folderPath, out OrnamentFolder folder)
        {
            folderPath = folderPath.TrimStart('/').TrimStart('\\');
            var difo = new DirectoryInfo(Path.Combine(this.PrivateFolder.FullName, folderPath));
            folder = new OrnamentFolder()
            {
                Name = difo.Name,
                FullPath = difo.FullName.Replace(PrivateFolder.FullName, "").Replace("\\", "/")
            };

            if (!difo.Exists)
            {
                difo.CreateEx();
                return true;
            }
            return false;

        }
    }
}