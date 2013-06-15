using Ornament.Messages;
using Ornament.Messages.Dao;

namespace Ornament.Contexts
{
    public class MessagesConfig
    {
        public const string PersonalMesssage = "Personal";
        public const string TaskMessage = "Task";
        public const string Notification = "Notification";
        public static string PersonalMessageId;
        public static string TaskId;
        public static string NotificationId;

        public MessageType PersonalMessageType
        {
            get
            {
                IMessageTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageTypeDao;
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
        }

        public MessageType NotificationMessageType
        {
            get
            {
                IMessageTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageTypeDao;
                if (NotificationId == null)
                {
                    MessageType notifi = dao.GetByName(Notification) ??
                                         new MessageType(Notification);
                    if (string.IsNullOrEmpty(notifi.Id))
                    {
                        dao.SaveOrUpdate(notifi);
                        dao.Flush();
                    }

                    NotificationId = notifi.Id;
                }
                return dao.Get(NotificationId);
            }
        }

        public MessageType TaskMessageType
        {
            get
            {
                IMessageTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageTypeDao;
                if (TaskId == null)
                {
                    MessageType taskMessageType = dao.GetByName(TaskMessage) ??
                                                  new MessageType(TaskMessage);

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
}