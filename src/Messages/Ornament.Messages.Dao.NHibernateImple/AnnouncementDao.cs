using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Contents;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class AnnouncementDao : DaoBase<string, Announcement>, IAnnouncementDao
    {
        private IProjection UserProperty
        {
            get { return Projections.Property<AnnouncementMessage>(s => s.User); }
        }
        private IProjection CreateTimeProperty
        {
            get { return Projections.Property<AnnouncementMessage>(s => s.CreateTime); }
        }

        public IList<Announcement> GetAll(int pageIndex, int pageSize, out int total)
        {
            total =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<int>();
            return CreateDetachedCriteria().AddOrder(Order.Desc(Projections.Property<Announcement>(s => s.ModifyTime)))
                .SetMaxResults(pageSize)
                .SetFirstResult(pageIndex * pageSize).GetExecutableCriteria(this.CurrentSession).List<Announcement>();
        }

        public IList<AnnouncementMessage> GetByUser(User user, int pageIndex, int pageSize)
        {
            return DetachedCriteria.For<AnnouncementMessage>()
                .AddOrder(Order.Desc(CreateTimeProperty))
                                   .Add(Restrictions.Eq(UserProperty, user))
                                   .SetMaxResults(pageSize)
                                   .SetFirstResult(pageSize * pageIndex)
                                   .GetExecutableCriteria(this.CurrentSession)
                                   .List<AnnouncementMessage>();

        }
    }
}