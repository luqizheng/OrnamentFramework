using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    public class NotifyMessageDao : DaoBase<string, NotifyMessage>, INotifyMessageDao
    {
        public IQueryable<NotifyMessage> Messages { get { return CurrentSession.Query<NotifyMessage>(); } }

        public IList<NotifyMessage> GetNewNotifyMessages(int pageSize, int pageIndex, out int total)
        {
            throw new NotImplementedException();
        }

        public int NewNotifyMsg(User user)
        {
            return 0;
        }

        public IList<NotifyMessage> ReadStateMessage(PersonalSearcher search)
        {
            throw new NotImplementedException();
        }
    }
}