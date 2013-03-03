using System.Linq;
using NHibernate.Linq;
using Qi.NHibernateExtender;


namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageDaoFactory : IDaoFactory
    {
        #region IDaoFactory Members

        /// <summary>
        /// 
        /// </summary>
        public IInfoDao InfoDao
        {
            get { return new InfoDao(); }
        }

        /// <summary>
        /// 
        /// </summary>
        public IInfoTypeDao InfoTypeDao
        {
            get { return new InfoTypeDao(); }
        }

        /// <summary>
        /// /
        /// </summary>
        public IQueryable<Message> Infos
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
        public IQueryable<MessageType> InfoTypes
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<MessageType>(); }
        }

        /// <summary>
        /// 
        /// </summary>
        public IInfoReaderDao InfoReaderDao
        {
            get { return new InfoReaderDao(); }
        }

        /// <summary>
        /// 
        /// </summary>
        public IInfoReadStateDao InfoReadStateDao
        {
            get { return new InfoReadStateDao(); }
        }

        #endregion
    }
}