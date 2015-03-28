using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Files.Dao
{
    public class FileDaoFactory:IFileDaoFactory
    {
        public IFileDao CreateFileDao()
        {
            return new FileRecordDao();
        }

        public IFileFormatSettingDao CreateFileFormatSettingDao()
        {
            return new FileFormatSettingDao();
        }
    }
}
