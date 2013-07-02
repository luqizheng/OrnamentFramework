using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton.Dao
{
    public interface IGymnasiumDao : Qi.Domain.IDao<int, Gymnasium>
    {
        IList<Gymnasium> GetGymnasiums(int pageSize, int currentPage,out int totalRows);
    }
}
