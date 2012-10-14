using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IInfoTypeDao : IDao<string, MessageType>
    {
        IList<MessageType> GetFirstLevel();
        MessageType GetByName(string name);

    }
}