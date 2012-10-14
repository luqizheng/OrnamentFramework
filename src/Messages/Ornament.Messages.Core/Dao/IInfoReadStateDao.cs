using System.Collections.Generic;
using Qi.Domain;
using Ornament.MemberShip;

namespace Ornament.Messages.Dao
{
    public interface IInfoReadStateDao : IDao<object[],ReaderReadStatus>
    {
        ReaderReadStatus Get(User user, Message message);

        IList<ReaderReadStatus> GetReadState(Message message);
        
            
        

    }
}