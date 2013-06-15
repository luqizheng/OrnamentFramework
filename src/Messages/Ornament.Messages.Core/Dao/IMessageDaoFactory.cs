using System;
using System.Linq;
using Microsoft.Win32;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao
{
    public interface IMessageDaoFactory
    {
        IQueryable<NotifyMessage> Messages { get; }

        IQueryable<Reader> ReadStates { get; }

        IQueryable<NewsType> MessageTypes { get; }

        INotifyMessageDao NotifyMessageDao { get; }

        IMessageTypeDao MessageTypeDao { get; }

        IPersonalMessageDao PersonalMessageDao { get; }

        IMessageReadStateDao MessageReadStateDao { get; }
    }
}