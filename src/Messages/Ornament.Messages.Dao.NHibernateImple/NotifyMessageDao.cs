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
    public class NotifyMessageDao : DaoBase<int, NotifyMessage>, INotifyMessageDao
    {
        public IQueryable<NotifyMessage> Messages
        {
            get { return CurrentSession.Query<NotifyMessage>(); }
        }

        public IList<NotifyMessage> GetNewNotifyMessages(User user, int pageSize, int pageIndex, out int total)
        {
            total = NewNotifyMsg(user);
            return
                BuildNewNotifyMsg(user)
                    .SetMaxResults(pageSize)
                    .SetFirstResult(pageSize*pageIndex)
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
    }
}