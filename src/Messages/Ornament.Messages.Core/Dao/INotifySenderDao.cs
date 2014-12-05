using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Messages.Notification.Senders;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INotifySenderDao:IDao<int,Sender>
    {
    }
}
