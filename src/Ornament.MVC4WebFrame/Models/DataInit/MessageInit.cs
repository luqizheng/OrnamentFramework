using System;
using Ornament.MemberShip;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
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
            get { return false; }
        }

        public void CreateData()
        {
            //InitMessageType();
            InitTask();
            InitNotify();
        }

        private void InitTask()
        {
            User admin = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId("admin");
            INotifyMessageDao msgDao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyMessageDao;
            var readerDao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageReadStateDao;

            var m = new NotifyMessage(admin) { State = EditState.Published };
            m.Contents.Add("zh-CN", new Content
                {
                    Subject = "请修改初始化密码",
                    Language = "zh-CN",
                    Value = "请修改初始化密码，如果已经修改过，请忽略这条信息"
                });

            msgDao.SaveOrUpdate(m);
            var reader = new Reader(admin, m);
            readerDao.SaveOrUpdate(reader);
            msgDao.Flush();
        }

        private void InitNotify()
        {
            User admin = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId("admin");
            INotifyMessageDao msgDao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyMessageDao;
            var readerDao = OrnamentContext.DaoFactory.MessageDaoFactory.MessageReadStateDao;


            for (int i = 0; i < 30; i++)
            {
                var m = new NotifyMessage(admin)
                    {
                        State = EditState.Published
                    };

                m.Contents.Add("zh-CN", new Content
                    {
                        Subject = "[Demo]请修改初始化密码",
                        Language = "zh-CN",
                        Value =
                            "Demo 请修改初始化密码，如果已经修改过，请忽略这条信息.在直角三角形中，∠A（非直角）的对边与斜边的比叫做∠A的正弦，记作sinA，即sinA porta lacus fringilla vel.d"
                    });


                msgDao.SaveOrUpdate(m);
                var reader = new Reader(admin, m);
                readerDao.SaveOrUpdate(reader);

            }
            msgDao.Flush();
        }
    }
}