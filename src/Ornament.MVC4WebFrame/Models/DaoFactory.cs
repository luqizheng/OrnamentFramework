using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using QiProject.Dao;

// ReSharper disable CheckNamespace

namespace Ornament.Web //扩展类，减少生成DaoFactory的代码。把它反正和OrnamentContext同一个namespace下面，减少using namespace的麻烦
// ReSharper restore CheckNamespace
{
    public static class DaoFactory
    {
        public static IMemberShipFactory MemberShipFactory(this OrnamentContext ornament)
        {
            return ornament.GetDaoFactory<IMemberShipFactory>();
        }

        public static IMessageDaoFactory MessageFactory(this OrnamentContext ornament)
        {
            return ornament.GetDaoFactory<IMessageDaoFactory>();
        }

        public static OrnamentMessageManager GetMessageManager(this OrnamentContext ornament)
        {
            return new OrnamentMessageManager(ornament.MessageFactory(), ornament.MemberShipFactory());
        }

        public static IProjectDaoFactory GetProjectDao(this OrnamentContext context)
        {
            return context.GetDaoFactory<IProjectDaoFactory>();
        }
    }

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