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
    public class MessageDao : DaoBase<int, NotifyMessage>, IMessageDao
    {
        public IQueryable<NotifyMessage> Messages
        {
            get { return CurrentSession.Query<NotifyMessage>(); }
        }

        public IList<NotifyMessage> GetAll(int pageSize, int pageIndex, out int total)
        {
            total = AllNotifyMsg()
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();

            return
                AllNotifyMsg()
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageIndex*pageSize)
                    .GetExecutableCriteria(this.CurrentSession)
                    .List<NotifyMessage>();

        }

        public IList<NotifyMessage> GetNewNotifyMessages(User user, int pageSize, int pageIndex, out int total)
        {
            total = NewNotifyMsg(user);
            return
                BuildNewNotifyMsg(user)
                    .AddOrder(Order.Desc(Projections.Property<NotifyMessage>(s => s.CreateTime)))
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageSize * pageIndex)
                    .GetExecutableCriteria(CurrentSession)
                    .List<NotifyMessage>();
        }

        public int NewNotifyMsg(User user)
        {
            return 0;
        }

        private DetachedCriteria BuildNewNotifyMsg(User user)
        {
            DetachedCriteria cri = CreateDetachedCriteria();
            
            return cri;
        }

        private DetachedCriteria AllNotifyMsg()
        {
            DetachedCriteria cri = CreateDetachedCriteria();
            return cri;
        }
    }
}