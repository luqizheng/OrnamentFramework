using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Files.Dao
{
    public interface IFileDao
        : IDao<string, FileRecord>
    {
        IList<FileRecord> Find(string name, int pageIndex, int pageSize, out int total);
    }
}