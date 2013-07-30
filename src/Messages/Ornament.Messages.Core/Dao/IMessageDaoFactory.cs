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
        IQueryable<NewsType> MessageTypes { get; }
        /// <summary>
        /// 
        /// </summary>
        INotifyMessageDao NotifyMessageDao { get; }
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
        IMessageTemplateDao MessageTemplateDao { get; }
        /// <summary>
        /// 
        /// </summary>
        INewsDao NewsDao { get; }
        /// <summary>
        /// 
        /// </summary>
        IAnnouncementDao AnnouncementDao { get; }
    }
}