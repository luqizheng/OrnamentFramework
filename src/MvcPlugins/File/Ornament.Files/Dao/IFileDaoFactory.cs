using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Qi.Domain;

namespace Ornament.Files.Dao
{
    public interface IFileDao
    : IDao<string, FileRecord>
    {

    }

    public interface IFileDaoFactory
    {
        IFileDao CreateFileDao();
    }
}
