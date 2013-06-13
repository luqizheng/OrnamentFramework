using Ornament.Messages;
using Ornament.Messages.Dao;

namespace Ornament.Web
{
    public static class MessageExtender
    {
        public const string PersonalMesssage = "Personal";
        public const string WorkItem = "Task";
        public const string Notification = "Notification";
        public static string PersonalMessageId;
        public static string TaskId;
        public static string NotificationId;

        public static MessageType PersonalMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (PersonalMessageId == null)
            {
                PersonalMessageId =
                    dao.GetByName(PersonalMesssage).Id;
            }
            return dao.Get(PersonalMessageId);
        }

        public static MessageType NotificationMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (NotificationId == null)
            {
                NotificationId =
                    dao.GetByName(Notification).Id;
            }
            return dao.Get(NotificationId);
        }

        public static MessageType TaskMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (TaskId == null)
            {
                PersonalMessageId =
                    dao.GetByName(WorkItem).Id;
            }
            return dao.Get(TaskId);
        }
    }
}