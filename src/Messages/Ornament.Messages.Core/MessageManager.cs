using System;
using Ornament.MemberShip;
using Ornament.Messages.Contents;
using Ornament.Messages.Dao;
using Ornament.Messages.Stores;

namespace Ornament.Messages
{
    public class InfoManager
    {
        private readonly StoreManager _manager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="manager"> </param>
        public InfoManager(IDaoFactory factory, StoreManager manager)
        {
            _manager = manager;
            if (factory == null)
                throw new ArgumentNullException("factory");

            Factory = factory;
        }

        /// <summary>
        /// 
        /// </summary>
        public IDaoFactory Factory { get; private set; }
       
        /// <summary>
        /// Save
        /// </summary>
        /// <param name="message"></param>
        public void Save(Message message)
        {
            
            var store = _manager.Get(message.StoreType);
            foreach (var content in message.Contents.Values)
            {
                store.Write(content, message);
            }
            Factory.InfoDao.SaveOrUpdate(message);
        }

        public Message Get(string id)
        {
            Message result = Factory.InfoDao.Get(id);
            return result;
        }

        public void SetReadState(ReadStatus status, string infoId, User user)
        {
            Message message = Factory.InfoDao.Get(infoId);
            IInfoReadStateDao stateDao = Factory.InfoReadStateDao;

            ReaderReadStatus readerStatus = stateDao.Get(user, message) ?? new ReaderReadStatus(user, message);

            readerStatus.Status = status;

            Factory.InfoReadStateDao.SaveOrUpdate(readerStatus);
        }

        public void Delete(Message message)
        {
            Factory.InfoDao.Delete(message);
            var store = _manager.Get(message.StoreType);
            foreach (var content in message.Contents.Values)
            {
                store.Delete(content, message);
            }
        }
    }
}