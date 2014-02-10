using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Ornament.Web.DataInitializers;

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
                NotifyMessageTemplate a = OrnamentContext.Configuration.MessagesConfig.AccountChanged;
                NotifyMessageTemplate b = OrnamentContext.Configuration.MessagesConfig.EmailAddressChanged;
                NotifyMessageTemplate c = OrnamentContext.Configuration.MessagesConfig.RegistAccount;
                NotifyMessageTemplate d = OrnamentContext.Configuration.MessagesConfig.RetrivePassword;
                return false;
            }
        }

        public void CreateData()
        {
           


            //InitMessageType();
            //InitTask();
            // InitNotify();
        }

        private void InitTask()
        {
            //User admin = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId("admin");
            //IMessageDao msgDao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageDao;
            //IReaderDao readerDao = OrnamentContext.DaoFactory.MessageDaoFactory.ReaderDao;

            //var m = new Announcement(admin) {State = EditState.Published};
            //m.Contents.Add("zh-CN", new Content("zh-CN")
            //    {
            //        Subject = "请修改初始化密码",
            //        Value = "请修改初始化密码，如果已经修改过，请忽略这条信息"
            //    });

            //msgDao.SaveOrUpdate(m);
            //var reader = new Reader(admin, m);
            //readerDao.SaveOrUpdate(reader);
            //msgDao.Flush();
        }

        private void InitNotify()
        {
            //User admin = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId("admin");
            //IMessageDao msgDao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageDao;
            //IReaderDao readerDao = OrnamentContext.DaoFactory.MessageDaoFactory.ReaderDao;


            //for (int i = 0; i < 30; i++)
            //{
            //    var m = new Announcement(admin)
            //        {
            //            State = EditState.Published
            //        };

            //    m.Contents.Add("zh-CN", new Content("zh-CN")
            //        {
            //            Subject = "[Demo]请修改初始化密码",
            //            Value =
            //                "Demo 请修改初始化密码，如果已经修改过，请忽略这条信息.在直角三角形中，∠A（非直角）的对边与斜边的比叫做∠A的正弦，记作sinA，即sinA porta lacus fringilla vel.d"
            //        });


            //    msgDao.SaveOrUpdate(m);
            //    var reader = new Reader(admin, m);
            //    readerDao.SaveOrUpdate(reader);
            //}
            //msgDao.Flush();
        }
    }
}