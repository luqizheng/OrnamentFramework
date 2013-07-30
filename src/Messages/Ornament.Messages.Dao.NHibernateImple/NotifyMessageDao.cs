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
    public class NotifyMessageDao : DaoBase<string, NotifyMessageBase>, INotifyMessageDao
    {
        public IQueryable<NotifyMessageBase> Messages
        {
            get { return CurrentSession.Query<NotifyMessageBase>(); }
        }

        public IList<NotifyMessageBase> GetAll(int pageSize, int pageIndex, out int total)
        {
            total = AllNotifyMsg()
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();

            return
                AllNotifyMsg()
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageIndex*pageSize)
                    .GetExecutableCriteria(CurrentSession)
                    .List<NotifyMessageBase>();
        }

        public IList<NotifyMessageBase> GetNotifyMessages(User user, ReadStatus? readStatus, int pageSize, int pageIndex,
                                                          out int total)
        {
            total = CountNotifyMsg(user, readStatus);
            return
                BuildNewNotifyMsg(user, readStatus)
                    .AddOrder(Order.Desc(Projections.Property<NotifyMessageBase>(s => s.CreateTime)))
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageSize*pageIndex)
                    .GetExecutableCriteria(CurrentSession)
                    .List<NotifyMessageBase>();
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
            cri.Add(Restrictions.Eq(Projections.Property<NotifyMessageBase>(s => s.User), user));
            if (readStatus != null)
                cri.Add(Restrictions.Eq(Projections.Property<NotifyMessageBase>(s => s.ReadStatus), readStatus));
            return cri;
        }

        private DetachedCriteria AllNotifyMsg()
        {
            DetachedCriteria cri = CreateDetachedCriteria();
            return cri;
        }
    }
}