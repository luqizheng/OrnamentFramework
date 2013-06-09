using System.Linq;
using NHibernate.Linq;
using Qi.NHibernateExtender;


namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageMessageDaoFactory : IMessageDaoFactory
    {
        #region IDaoFactory Members

        /// <summary>
        /// 
        /// </summary>
        public IMessageDao MessageDao
        {
            get { return new MessageDao(); }
        }

        /// <summary>
        /// 
        /// </summary>
        public IMessageTypeDao MessageTypeDao
        {
            get { return new MessageTypeDao(); }
        }

        /// <summary>
        /// /
        /// </summary>
        public IQueryable<Message> Messages
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<Message>(); }
        }

        /// <summary>
        /// /
        /// </summary>
        public IQueryable<ReaderReadStatus> ReadStates
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<ReaderReadStatus>(); }
        }

        /// <summary>
        /// 
        /// </summary>
        public IQueryable<MessageType> MessageTypes
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<MessageType>(); }
        }

      
        /// <summary>
        /// 
        /// </summary>
        public IInfoReadStateDao MessageReadStateDao
        {
            get { return new InfoReadStateDao(); }
        }

        #endregion
    }
}