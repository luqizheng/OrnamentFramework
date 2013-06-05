using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageTypeDao : IDao<string, MessageType>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IList<MessageType> GetFirstLevel();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        MessageType GetByName(string name);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parent"></param>
        /// <returns></returns>
        IList<MessageType> GetList(MessageType parent);
    }
}