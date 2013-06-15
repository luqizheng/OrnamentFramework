using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageDao : IDao<string, Message>
    {


        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="type"></param>
        /// <param name="includeSubType"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType, out int total);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="type"></param>
        /// <param name="includeSubType"></param>
        /// <returns></returns>
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="search"></param>

        /// <returns></returns>
        int CountReadStateMessage(PersonalSearcher search);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        IList<Message> ReadStateMessage(PersonalSearcher search);

        IQueryable<Message> Messages { get; }
    }
}