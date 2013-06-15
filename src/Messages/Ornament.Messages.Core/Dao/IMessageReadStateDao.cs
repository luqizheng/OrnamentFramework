using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageReadStateDao : IDao<object[], Reader>
    {
        Reader Get(User user, NotifyMessage notifyMessage);

        IList<Reader> GetReadState(NotifyMessage notifyMessage);

        IQueryable<Reader> ReaderReadStatus { get; }
    }
}