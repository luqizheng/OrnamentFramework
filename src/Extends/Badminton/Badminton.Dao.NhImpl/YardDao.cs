using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Badminton.Dao.NhImpl
{
    internal class YardDao : DaoBase<int, Yard>, IYardDao
    {
        public IList<Yard> GetGymnasiums(int pageSize, int currentPage, out int totalRows)
        {

            totalRows =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<int>();

            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageSize * currentPage)
                                    .GetExecutableCriteria(CurrentSession).List<Yard>();
        }
    }
}