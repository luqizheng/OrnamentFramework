using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageDao : IDao<string, Message>
    {
        IQueryable<Message> Messages { get; }

        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="type"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, out int total);

        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type);

        /// <summary>
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        int CountReadStateMessage(PersonalSearcher search);

        /// <summary>
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        IList<Message> ReadStateMessage(PersonalSearcher search);
    }
}