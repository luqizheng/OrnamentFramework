using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageDaoFactory : IMessageDaoFactory
    {
        public IQueryable<NotifyMessage> Messages { get { return MessageDao.Messages; } }
        public IQueryable<Reader> ReadStates { get { return ReaderDao.ReaderReadStatus; } }
        public IQueryable<NewsType> MessageTypes { get { return NewsTypeDao.Types; } }
        public IMessageDao MessageDao
        {
            get
            {
                return new MessageDao();
            }
        }
        public INewsTypeDao NewsTypeDao
        {
            get
            {
                return new NewsTypeDao();
            }
        }

        public INotifyTypeDao NotifyTypeDao { get { return new NotifyTypeDao(); } }

        public IPersonalMessageDao PersonalMessageDao { get { return new PersonalMessageDao(); } }
        public IReaderDao ReaderDao { get { return new ReaderDao(); } }
        public INewsDao NewsDao { get { return new NewsDao(); } }
    }
}
