using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;

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

        public NewsType PersonalNewsType
        {
            get
            {
                INewsTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NewsTypeDao;
                if (PersonalMessageId == null)
                {
                    NewsType personal = dao.GetByName(PersonalMesssage) ?? new NewsType(PersonalMesssage);
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

        public NewsType NotificationNewsType
        {
            get
            {
                INewsTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NewsTypeDao;
                if (NotificationId == null)
                {
                    NewsType notifi = dao.GetByName(Notification) ??
                                         new NewsType(Notification);
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

        public NewsType TaskNewsType
        {
            get
            {
                INewsTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NewsTypeDao;
                if (TaskId == null)
                {
                    NewsType taskNewsType = dao.GetByName(TaskMessage) ??
                                                  new NewsType(TaskMessage);

                    if (string.IsNullOrEmpty(taskNewsType.Id))
                    {
                        dao.SaveOrUpdate(taskNewsType);
                        dao.Flush();
                    }

                    TaskId = taskNewsType.Id;
                }
                return dao.Get(TaskId);
            }
        }
    }
}