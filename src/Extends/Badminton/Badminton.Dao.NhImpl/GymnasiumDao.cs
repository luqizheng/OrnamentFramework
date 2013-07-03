using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Badminton.Dao.NhImpl
{
    internal class GymnasiumDao : DaoBase<int, Gymnasium>, IGymnasiumDao
    {
        public IList<Gymnasium> GetGymnasiums(int pageSize, int currentPage, out int totalRows)
        {

            totalRows =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(this.CurrentSession)
                    .UniqueResult<int>();

            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageSize * currentPage)
                                    .GetExecutableCriteria(this.CurrentSession).List<Gymnasium>();
        }
    }
}