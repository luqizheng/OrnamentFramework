using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Ornament.Messages.PersonalMessages;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IPersonalMessageDao : IDao<int, PersonalMessage>
    {
        /// <summary>
        /// </summary>
        IQueryable<PersonalMessage> PersonalMessages { get; }
        /// <summary>
        /// Get personal message about users relative
        /// </summary>
        /// <param name="user"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        IList<PersonalMessage> GetLastMessageForEachUser(User user, int pageIndex, int pageSize);
        /// <summary>
        /// Count all new msg
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        int CountNewMessage(User user);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="relative"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        IList<PersonalMessage> GetChat(User owner, User relative,DateTime? lastGetLastTime,int pageIndex,int pageSize);
    }
}
