using System.Collections;
using System.IO;
using Ornament.Files.Dao;
using Ornament.MemberShip;
using Qi.IO;

namespace Ornament.Files
{
    public class FileManager
    {
        private readonly IFileDaoFactory _daoFactory;

        public FileManager(IFileDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="filePath">文件保存路径，fullPath，包括文件的</param>
        /// <param name="fileName">显示的文件名</param>
        /// <param name="creator"></param>
        /// <param name="recordId"></param>
        /// <returns></returns>
        public FileRecord SaveFileRecord(string filePath, string fileName, User creator, string recordId)
        {
            var daofactory = _daoFactory.CreateFileDao();
            FileRecord fileRecord;
            string delingFile = null;
            if (recordId != null)
            {
                fileRecord = daofactory.Get(recordId);
                delingFile = fileRecord.FullPath + ".del_" + recordId;
                File.Move(fileRecord.FullPath, delingFile);

                fileRecord.FullPath = filePath;
                fileRecord.Name = fileName;
                fileRecord.Creator = creator;
            }
            else
            {
                fileRecord = new FileRecord(filePath, creator, fileName);
            }

            daofactory.SaveOrUpdate(fileRecord);
            daofactory.Flush();
            if (delingFile != null)
                File.Delete(delingFile);
            return fileRecord;
        }

        public bool IsExistBySigeCode(string filePath)
        {
            string signCode = FileRecord.Sign(filePath);
            return _daoFactory.CreateFileDao().IsExist(signCode);
        }

        public Stream GetFile(string id, out string name)
        {
            FileRecord filePath = _daoFactory.CreateFileDao().Get(id);
            name = filePath.Name;
            return File.Open(filePath.FullPath, FileMode.Open, FileAccess.Read);
        }
    }
}