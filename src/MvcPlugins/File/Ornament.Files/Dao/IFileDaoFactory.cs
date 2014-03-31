using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Files.Dao
{
    public interface IFileDaoFactory
    {
        IFileDao CreateFileDao();
    }
}
