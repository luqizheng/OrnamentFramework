using Ornament.Messages;
using Ornament.Messages.Dao;

namespace Ornament.Web
{
    public static class MessageExtender
    {
        public const string PersonalMesssage = "Personal";
        public const string TaskMessage = "Task";
        public const string Notification = "Notification";
        public static string PersonalMessageId;
        public static string TaskId;
        public static string NotificationId;

        public static MessageType PersonalMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (PersonalMessageId == null)
            {
                MessageType personal = dao.GetByName(PersonalMesssage) ?? new MessageType(PersonalMesssage);
                if (string.IsNullOrEmpty(personal.Id))
                {
                    dao.SaveOrUpdate(personal);
                    dao.Flush();
                }
                PersonalMessageId = personal.Id;
            }
            return dao.Get(PersonalMessageId);
        }

        public static MessageType NotificationMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (NotificationId == null)
            {
                MessageType notifi = dao.GetByName(Notification) ??
                                     new MessageType(Notification, PersonalMessageType(ornamentContext));
                if (string.IsNullOrEmpty(notifi.Id))
                {
                    dao.SaveOrUpdate(notifi);
                    dao.Flush();
                }

                NotificationId = notifi.Id;
            }
            return dao.Get(NotificationId);
        }

        public static MessageType TaskMessageType(this OrnamentContext ornamentContext)
        {
            IMessageTypeDao dao = ornamentContext.MessageFactory().MessageTypeDao;
            if (TaskId == null)
            {
                MessageType taskMessageType = dao.GetByName(TaskMessage) ??
                                              new MessageType(TaskMessage, PersonalMessageType(ornamentContext));

                if (string.IsNullOrEmpty(taskMessageType.Id))
                {
                    dao.SaveOrUpdate(taskMessageType);
                    dao.Flush();
                }

                TaskId = taskMessageType.Id;
            }
            return dao.Get(TaskId);
        }
    }
}