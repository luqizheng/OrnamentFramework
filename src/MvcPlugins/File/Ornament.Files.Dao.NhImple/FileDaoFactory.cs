using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
