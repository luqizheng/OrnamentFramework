using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Files.Dao;
using Ornament.MemberShip;

namespace Ornament.Files
{
    public class FileManager
    {
        private readonly IFileDaoFactory _daoFactory;

        public FileManager(IFileDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        public void SaveFileRecord(string filePath, string fileName, User creator)
        {
            var fileRecord = new FileRecord(filePath, creator, fileName);
            _daoFactory.CreateFileDao().SaveOrUpdate(fileRecord);
        }

        public bool IsExistBySigeCode(string filePath)
        {
            var signCode = FileRecord.Sign(filePath);
            return _daoFactory.CreateFileDao().IsExist(signCode);
        }

        public Stream GetFile(string id, out string name)
        {
            var filePath = _daoFactory.CreateFileDao().Get(id);
            name = filePath.Name;
            return File.Open(filePath.FullPath, FileMode.Open, FileAccess.Read);
        }
    }
}
