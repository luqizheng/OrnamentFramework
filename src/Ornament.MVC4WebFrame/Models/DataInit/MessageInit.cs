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
            InitDemo();
        }

        private void InitDemo()
        {
            User admin = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId("admin");
            IMessageDao msgDao = OrnamentContext.Current.MessageFactory().MessageDao;


            var m = new Message(admin, OrnamentContext.Current.TaskMessageType());
            m.Contents.Add("zh-CN", new Content
                {
                    Subject = "请修改初始化密码",
                    Language = "zh-CN",
                    Value = "请修改初始化密码，如果已经修改过，请忽略这条信息"
                });
            m.AddReaders(admin);
            msgDao.SaveOrUpdate(m);
            msgDao.Flush();
        }

        private void InitMessageType()
        {
            //init message type.
            OrnamentContext.Current.TaskMessageType();
            OrnamentContext.Current.NotificationMessageType();
        }
    }
}