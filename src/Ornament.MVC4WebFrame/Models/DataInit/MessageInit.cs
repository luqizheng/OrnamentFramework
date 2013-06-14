using System;
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
                User admin = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId("admin");
                IMessageDao msgDao = OrnamentContext.Current.MessageFactory().MessageDao;
                return msgDao.CountReadStateMessage(new PersonalSearcher(admin, OrnamentContext.Current.PersonalMessageType())) < 1;
            }
        }

        public void CreateData()
        {
            //InitMessageType();
            InitTask();
            InitNotify();
        }

        private void InitTask()
        {
            User admin = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId("admin");
            IMessageDao msgDao = OrnamentContext.Current.MessageFactory().MessageDao;


            var m = new Message(admin, OrnamentContext.Current.TaskMessageType());
            m.State = MessageState.Published;
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

        private void InitNotify()
        {
            User admin = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId("admin");
            IMessageDao msgDao = OrnamentContext.Current.MessageFactory().MessageDao;
            var ary = Enum.GetValues(typeof(Priority));
            for (int i = 0; i < 30; i++)
            {
                var m = new Message(admin, OrnamentContext.Current.NotificationMessageType())
                    {
                        State = MessageState.Published,
                        Priority = (Priority)ary.GetValue(i % ary.Length)
                    };

                m.Contents.Add("zh-CN", new Content
                    {
                        Subject = "[Demo]请修改初始化密码",
                        Language = "zh-CN",
                        Value =
                            "Demo 请修改初始化密码，如果已经修改过，请忽略这条信息.在直角三角形中，∠A（非直角）的对边与斜边的比叫做∠A的正弦，记作sinA，即sinA porta lacus fringilla vel.d"
                    });
                m.AddReaders(admin);
                msgDao.SaveOrUpdate(m);
            }
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