using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageDao : IDao<string, Message>
    {
        /// <summary>
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="cacasde"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        IList<Message> Find(string typeName, int pageIndex, int pageSize, bool cacasde, MessageState state);

        /// <summary>
        /// </summary>
        /// <param name="typeId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="cacasde"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        IList<Message> Find(Guid typeId, int pageIndex, int pageSize, bool cacasde, MessageState state);

        /// <summary>
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="state"></param>
        /// <param name="cacasde"></param>
        /// <param name="createQuery"></param>
        /// <returns></returns>
        IList<Message> Find(string typeName, DateTime startTime, DateTime endTime, MessageState state, bool cacasde,
                            object createQuery);

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="typeName"></param>
        /// <returns></returns>
        IList<Message> GetUserMessages(User user, int pageSize, int pageIndex, params string[] typeName);

        /// <summary>
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        IList<Message> Find(MessageSearcher search);

        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="type"></param>
        /// <param name="includeSubType"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType, out int total);
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType);
    }
}