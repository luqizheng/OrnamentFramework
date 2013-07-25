using System.Linq;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageDaoFactory : IMessageDaoFactory
    {
        /// <summary>
        /// </summary>
        public IQueryable<NewsType> MessageTypes
        {
            get { return NewsTypeDao.Types; }
        }

        /// <summary>
        /// </summary>
        public INotifyMessageDao MessageDao
        {
            get { return new NotifyMessageDao(); }
        }

        /// <summary>
        /// </summary>
        public INewsTypeDao NewsTypeDao
        {
            get { return new NewsTypeDao(); }
        }

        /// <summary>
        /// </summary>
        public INotifyTypeDao NotifyTypeDao
        {
            get { return new NotifyTypeDao(); }
        }

        /// <summary>
        /// </summary>
        public IPersonalMessageDao PersonalMessageDao
        {
            get { return new PersonalMessageDao(); }
        }

        /// <summary>
        /// </summary>
        public IMessageTemplateDao MessageTemplateDao
        {
            get { return new SimpleMessageFactoryDao(); }
        }

        /// <summary>
        /// </summary>
        public INewsDao NewsDao
        {
            get { return new NewsDao(); }
        }

        public IAnnouncementDao AnnouncementDao
        {
            get { return new AnnouncementDao(); }
        }
    }
}