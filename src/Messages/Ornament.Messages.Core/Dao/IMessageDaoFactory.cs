using System;
using System.Linq;
using Microsoft.Win32;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao
{
    public interface IMessageDaoFactory
    {
        /// <summary>
        /// 
        /// </summary>
        IQueryable<NotifyMessage> Messages { get; }
        /// <summary>
        /// 
        /// </summary>
        IQueryable<Reader> ReadStates { get; }
        /// <summary>
        /// 
        /// </summary>
        IQueryable<NewsType> MessageTypes { get; }
        /// <summary>
        /// 
        /// </summary>
        IMessageDao MessageDao { get; }
        /// <summary>
        /// 
        /// </summary>
        INewsTypeDao NewsTypeDao { get; }
        /// <summary>
        /// 
        /// </summary>
        INotifyTypeDao NotifyTypeDao { get; }
        /// <summary>
        /// 
        /// </summary>
        IPersonalMessageDao PersonalMessageDao { get; }
        /// <summary>
        /// 
        /// </summary>
        IReaderDao ReaderDao { get; }
        /// <summary>
        /// 
        /// </summary>
        INewsDao NewsDao { get;  }
    }
}