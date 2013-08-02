using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    public class SimpleMessageDao : DaoBase<string, SimpleMessage>, ISimpleMessageDao
    {
        public IQueryable<SimpleMessage> Messages
        {
            get { return CurrentSession.Query<SimpleMessage>(); }
        }

        public IList<SimpleMessage> GetAll(int pageSize, int pageIndex, out int total)
        {
            total = AllNotifyMsg()
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();

            return
                AllNotifyMsg()
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageIndex*pageSize)
                    .GetExecutableCriteria(CurrentSession)
                    .List<SimpleMessage>();
        }

        public IList<SimpleMessage> GetNotifyMessages(User user, ReadStatus? readStatus, int pageSize, int pageIndex,
                                                          out int total)
        {
            total = CountNotifyMsg(user, readStatus);
            return
                BuildNewNotifyMsg(user, readStatus)
                    .AddOrder(Order.Desc(Projections.Property<SimpleMessage>(s => s.CreateTime)))
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageSize*pageIndex)
                    .GetExecutableCriteria(CurrentSession)
                    .List<SimpleMessage>();
        }

        public int CountNotifyMsg(User user, ReadStatus? readStatus)
        {
            return BuildNewNotifyMsg(user, readStatus)
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        private DetachedCriteria BuildNewNotifyMsg(User user, ReadStatus? readStatus)
        {
            DetachedCriteria cri = CreateDetachedCriteria();
            cri.Add(Restrictions.Eq(Projections.Property<SimpleMessage>(s => s.User), user));
            if (readStatus != null)
                cri.Add(Restrictions.Eq(Projections.Property<SimpleMessage>(s => s.ReadStatus), readStatus));
            return cri;
        }

        private DetachedCriteria AllNotifyMsg()
        {
            DetachedCriteria cri = CreateDetachedCriteria();
            return cri;
        }
    }
}