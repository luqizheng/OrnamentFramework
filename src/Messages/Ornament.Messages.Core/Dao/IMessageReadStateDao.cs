using System.Collections.Generic;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageReadStateDao : IDao<object[], ReaderReadStatus>
    {
        ReaderReadStatus Get(User user, Message message);

        IList<ReaderReadStatus> GetReadState(Message message);
    }
}