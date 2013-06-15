using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageTypeDao : IDao<string, MessageType>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        MessageType GetByName(string name);
        /// <summary>
        /// 
        /// </summary>
        IQueryable<MessageType> MessageTypes { get; }
    }
}