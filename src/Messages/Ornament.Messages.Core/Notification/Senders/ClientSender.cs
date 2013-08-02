using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : ISender
    {
        public ClientSender(IMessageDaoFactory daoFactory)
        {
            DaoFactory = daoFactory;
        }

        public IMessageDaoFactory DaoFactory { get; set; }

        public CommunicationType CommunicationType
        {
            get { return CommunicationType.Client; }
        }

        public void Send(SimpleMessage notifyMessage)
        {
            DaoFactory.SimpleMessageDao.SaveOrUpdate(notifyMessage);
        }
    }
}