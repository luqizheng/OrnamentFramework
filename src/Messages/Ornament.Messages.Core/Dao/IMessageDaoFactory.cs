using System.Linq;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Dao
{
    public interface IMessageDaoFactory
    {
        /// <summary>
        /// </summary>
        IQueryable<NewsType> MessageTypes { get; }

        /// <summary>
        /// </summary>
        ISimpleMessageDao SimpleMessageDao { get; }

        /// <summary>
        /// </summary>
        INewsTypeDao NewsTypeDao { get; }

        /// <summary>
        /// </summary>
        IPersonalMessageDao PersonalMessageDao { get; }

        /// <summary>
        /// </summary>
        IMessageTemplateDao MessageTemplateDao { get; }

        /// <summary>
        /// </summary>
        INotifySenderDao NotifySenderDao { get; }

        /// <summary>
        /// </summary>
        INewsDao NewsDao { get; }
    }
}