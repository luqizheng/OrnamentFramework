using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INotifyMessageDao : IDao<string, NotifyMessage>
    {
        IQueryable<NotifyMessage> Messages { get; }

        
        IList<NotifyMessage> GetNewNotifyMessages(int pageSize, int pageIndex, out int total);
        
        /// <summary>
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        int NewNotifyMsg(User user);

        /// <summary>
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        IList<NotifyMessage> ReadStateMessage(PersonalSearcher search);
    }
}