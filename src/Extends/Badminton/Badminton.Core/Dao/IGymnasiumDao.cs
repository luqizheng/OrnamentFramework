using System.Collections.Generic;
using Qi.Domain;

namespace Badminton.Dao
{
    public interface IGymnasiumDao : IDao<int, Gymnasium>
    {
        IList<Gymnasium> GetGymnasiums(int pageSize, int currentPage, out int totalRows);
    }
}