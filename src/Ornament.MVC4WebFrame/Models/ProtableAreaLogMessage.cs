using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcContrib.PortableAreas;
using log4net;

namespace Ornament.MVCWebFrame.Models
{
    public class ProtableAreaLogMessage : MessageHandler<IEventMessage>
    {
        public override void Handle(IEventMessage message)
        {
            LogManager.GetLogger(this.GetType()).Debug(message);
        }
    }
}