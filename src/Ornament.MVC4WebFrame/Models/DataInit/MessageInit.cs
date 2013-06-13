using Ornament.MemberShip;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Web.Models;

// ReSharper disable CheckNamespace
namespace Ornament.Web
// ReSharper restore CheckNamespace
{
    public class MessageInit : IDataInitializer
    {
        public string Name
        {
            get { return "Message init."; }
        }

        public bool IsNeedInitialize
        {
            get
            {
                User user = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId("admin");
                return user == null;
            }
        }

        public void CreateData()
        {
            InitMessageType();
        }

        private void InitMessageType()
        {
            var personal = new MessageType(MessageExtender.PersonalMesssage);
            IMessageTypeDao typeMessageDao =
                OrnamentContext.Current.MessageFactory().MessageTypeDao;
            typeMessageDao.SaveOrUpdate(personal);
            typeMessageDao.Flush();
            MessageExtender.NotificationId = personal.Id;


            var taskMsgType = new MessageType(MessageExtender.WorkItem, personal);
            typeMessageDao.SaveOrUpdate(taskMsgType);
            MessageExtender.TaskId = taskMsgType.Id;
            typeMessageDao.Flush();

            var notificationMsg = new MessageType(MessageExtender.Notification, personal);
            typeMessageDao.SaveOrUpdate(notificationMsg);
            MessageExtender.NotificationId = notificationMsg.Id;
            typeMessageDao.Flush();
        }
    }
}