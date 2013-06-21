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

        INewsTypeDao NewsTypeDao { get; }
        INotifyTypeDao NotifyTypeDao { get; }
        IPersonalMessageDao PersonalMessageDao { get; }

        IReaderDao ReaderDao { get; }
        INewsDao NewsDao { get;  }
    }
}