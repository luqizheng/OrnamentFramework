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
    /// 
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
                .GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();

            return
                AllNotifyMsg()
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageIndex*pageSize)
                    .GetExecutableCriteria(this.CurrentSession)
                    .List<NotifyMessageBase>();

        }

        public IList<NotifyMessageBase> GetNewNotifyMessages(User user, int pageSize, int pageIndex, out int total)
        {
            total = NewNotifyMsg(user);
            return
                BuildNewNotifyMsg(user)
                    .AddOrder(Order.Desc(Projections.Property<Announcement>(s => s.ModifyTime)))
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageSize * pageIndex)
                    .GetExecutableCriteria(CurrentSession)
                    .List<NotifyMessageBase>();
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