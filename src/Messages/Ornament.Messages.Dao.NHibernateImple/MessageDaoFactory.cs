using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageDaoFactory : IMessageDaoFactory
    {
        public IQueryable<Message> Messages { get { return MessageDao.Messages; } }
        public IQueryable<ReaderReadStatus> ReadStates { get { return MessageReadStateDao.ReaderReadStatus; } }
        public IQueryable<MessageType> MessageTypes { get { return MessageTypeDao.MessageTypes; } }
        public IMessageDao MessageDao
        {
            get
            {
                return new MessageDao();
            }
        }
        public IMessageTypeDao MessageTypeDao
        {
            get
            {
                return new MessageTypeDao();
            }
        }
        public IMessageReadStateDao MessageReadStateDao { get { return new MessageReadStateDao(); } }
    }
}
