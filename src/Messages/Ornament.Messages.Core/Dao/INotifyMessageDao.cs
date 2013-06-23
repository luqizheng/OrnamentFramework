using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INotifyMessageDao : IDao<int, NotifyMessage>
    {
        /// <summary>
        /// </summary>
        IQueryable<NotifyMessage> Messages { get; }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<NotifyMessage> GetNewNotifyMessages(User user, int pageSize, int pageIndex, out int total);

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        int NewNotifyMsg(User user);
    }
}