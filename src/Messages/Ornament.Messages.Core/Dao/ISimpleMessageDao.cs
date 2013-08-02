using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    /// <summary>
    ///     获取所有NotifyMessage的Dao。包括获取Template产生的SimpleMessage以及AnnounceMessage
    /// </summary>
    public interface ISimpleMessageDao : IDao<string, SimpleMessage>
    {
        /// <summary>
        /// </summary>
        IQueryable<SimpleMessage> Messages { get; }


        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<SimpleMessage> GetAll(int pageSize, int pageIndex, out int total);

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="readStatus"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<SimpleMessage> GetNotifyMessages(User user, ReadStatus? readStatus, int pageSize, int pageIndex,
                                                   out int total);

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="readStatus"></param>
        /// <returns></returns>
        int CountNotifyMsg(User user, ReadStatus? readStatus);
    }
}