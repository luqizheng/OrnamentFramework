using System.Collections.Generic;
using System.IO;
using System.Text;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Properties;
using Qi.IO.Serialization;

namespace Ornament.Contexts
{
    public class MessagesConfig
    {
        private static string _personalMessageId;
        private static string _registId;
        private static string _verifyEmailAddressId;

        /// <summary>
        /// </summary>
        public NotifyType RegistAccount
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_personalMessageId == null)
                {
                    _personalMessageId = CreateNotifyType("Regist New User (Template)",
                                                          "Regist New user, and verify safe email address.", dao,
                                                          new Dictionary<string, Content>
                                                              {
                                                                  {
                                                                      "zh-CN",
                                                                      DeserializerXml(Resources.registAccount_zh_CN,
                                                                                      "zh-CN")
                                                                  },
                                                                  {"en", DeserializerXml(Resources.registAccount, "en")},
                                                                  {
                                                                      "zh",
                                                                      DeserializerXml(Resources.registAccount_zh, "zh")
                                                                  }
                                                              });
                }
                return dao.Get(_personalMessageId);
            }
        }

        public NotifyType VerifyEmailAddress
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_verifyEmailAddressId == null)
                {
                    _verifyEmailAddressId = CreateNotifyType("Verify Email Address (Template)",
                                                             "Email has changed, It should verify again.", dao,
                                                             new Dictionary<string, Content>());
                }
                return dao.Get(_verifyEmailAddressId);
            }
        }

        /// <summary>
        /// </summary>
        public NotifyType AccountChanged
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_registId == null)
                {
                    _registId = CreateNotifyType("Account Changed (Inside)", "log some about account changed.", dao,
                                                 new Dictionary<string, Content>());
                }
                return dao.Get(_registId);
            }
        }

        private Content DeserializerXml(string text, string lang)
        {
            using (var zhStream = new MemoryStream(Encoding.UTF8.GetBytes(text)))
            {
                var content = (Content) SerializationHelper.DeserializerXml(zhStream, typeof (Content));
                content.Language = lang;
                return content;
            }
        }


        private string CreateNotifyType(string name, string remark, INotifyTypeDao dao,
                                        IDictionary<string, Content> contents)
        {
            NotifyType personal = dao.GetByName(name) ?? new NotifyType();
            personal.Name = name;
            personal.Remark = remark;
            if (string.IsNullOrEmpty(personal.Id))
            {
                dao.SaveOrUpdate(personal);
                dao.Flush();
            }
            foreach (string key in contents.Keys)
            {
                personal.Contents.Add(key, contents[key]);
            }


            return personal.Id;
        }
    }
}