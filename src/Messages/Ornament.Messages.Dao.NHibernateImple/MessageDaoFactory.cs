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
        public IQueryable<NotifyMessage> Messages { get { return NotifyMessageDao.Messages; } }
        public IQueryable<Reader> ReadStates { get { return MessageReadStateDao.ReaderReadStatus; } }
        public IQueryable<NewsType> MessageTypes { get { return MessageTypeDao.MessageTypes; } }
        public INotifyMessageDao NotifyMessageDao
        {
            get
            {
                return new NotifyMessageDao();
            }
        }
        public IMessageTypeDao MessageTypeDao
        {
            get
            {
                return new MessageTypeDao();
            }
        }

        public IPersonalMessageDao PersonalMessageDao { get { return new PersonalMessageDao(); } }
        public IMessageReadStateDao MessageReadStateDao { get { return new MessageReadStateDao(); } }
    }
}
