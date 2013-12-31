using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using log4net;
using Ornament.Web.PortableAreas;

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