using System.Linq;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;

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
        public ISimpleMessageDao SimpleMessageDao
        {
            get { return new SimpleMessageDao(); }
        }

        /// <summary>
        /// </summary>
        public INewsTypeDao NewsTypeDao
        {
            get { return new NewsTypeDao(); }
        }

        ///// <summary>
        ///// </summary>
        //public INotifyTypeDao NotifyTypeDao
        //{
        //    get { return new NotifyTypeDao(); }
        //}

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
            get { return new NotifyMessageTemplateDao(); }
        }
        /// <summary>
        /// NotifySenderDao
        /// </summary>
        public INotifySenderDao NotifySenderDao
        {
            get
            {
                return new NotifySenderDao();
            }
        }

        /// <summary>
        /// </summary>
        public INewsDao NewsDao
        {
            get { return new NewsDao(); }
        }



    }
}