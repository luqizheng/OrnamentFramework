using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Messages.Notification
{
    public interface ISender
    {
        CommunicationType CommunicationType { get; }
        void Send(NotifyMessageBase notifyMessage);
    }

    
}
