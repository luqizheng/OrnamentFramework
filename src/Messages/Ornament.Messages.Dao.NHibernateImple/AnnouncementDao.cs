using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class AnnouncementDao : DaoBase<string, Announcement>, IAnnouncementDao
    {
        public IList<Announcement> GetAll(int pageIndex, int pageSize, out int total)
        {
            total =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<int>();
            return CreateDetachedCriteria()
                .SetMaxResults(pageSize)
                .SetFirstResult(pageIndex * pageSize).GetExecutableCriteria(this.CurrentSession).List<Announcement>();
        }
    }
}