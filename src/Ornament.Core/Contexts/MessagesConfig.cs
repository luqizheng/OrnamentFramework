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
        private static string dd = "";
        private static string _registId
        {
            get { return dd; }
            set
            {
                dd = value;
            }

        }
        private static string _verifyEmailAddressId;
        private static string _passwordRetrive;
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

                var result = dao.Get(_personalMessageId);
                if (result == null)
                {
                    _personalMessageId = null;
                    return RegistAccount;
                }
                return result;
            }
        }

        public NotifyType EmailAddressChanged
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_verifyEmailAddressId == null)
                {
                    _verifyEmailAddressId = CreateNotifyType("Verify Email Address (Template)",
                                                             "Email has changed, It should verify again.", dao,
                                                             new Dictionary<string, Content>
                                                                 {
                                                                     {
                                                                         "zh-CN",
                                                                         DeserializerXml(Resources.emailChanged_zh_CN,
                                                                                         "zh-CN")
                                                                     },
                                                                     {
                                                                         "zh",
                                                                         DeserializerXml(Resources.emailChanged_zh, "zh")
                                                                     },
                                                                     {
                                                                         "en",
                                                                         DeserializerXml(Resources.emailChanged, "en")
                                                                     },
                                                                 });
                }
                var result = dao.Get(_verifyEmailAddressId);
                if (result == null)
                {
                    _verifyEmailAddressId = null;
                    return EmailAddressChanged;
                }
                return result;
            }
        }

        public NotifyType RetrivePassword
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_passwordRetrive == null)
                {
                    _passwordRetrive = CreateNotifyType("Forget Password (Template)",
                                                             "Retrive Password", dao,
                                                             new Dictionary<string, Content>
                                                                 {
                                                                     {
                                                                         "zh-CN",
                                                                         DeserializerXml(
                                                                             Resources.forgetPassword_zh_CN, "zh-CN")
                                                                     },
                                                                     {
                                                                         "zh",
                                                                         DeserializerXml(Resources.forgetPassword_zh,
                                                                                         "zh")
                                                                     },
                                                                     {
                                                                         "en",
                                                                         DeserializerXml(Resources.forgetPassword, "en")
                                                                     },
                                                                 });
                }
                var result = dao.Get(_passwordRetrive);
                if (result == null)
                {
                    _passwordRetrive = null;
                    return this.RetrivePassword;
                }
                return result;
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

                var result = dao.Get(_registId);
                if (result == null)
                {
                    _registId = null;
                    return this.AccountChanged;
                }
                return result;
            }
        }


        private Content DeserializerXml(string text, string lang)
        {
            using (var zhStream = new MemoryStream(Encoding.UTF8.GetBytes(text)))
            {
                var content = (Content)SerializationHelper.DeserializerXml(zhStream, typeof(Content));
                content.Language = lang;
                return content;
            }
        }


        private string CreateNotifyType(string name, string remark, INotifyTypeDao dao,
                                        IDictionary<string, Content> contents)
        {
            NotifyType personal = dao.GetByName(name);
            if (personal != null)
                return personal.Id;
            personal = new NotifyType();
            personal.Name = name;
            personal.Remark = remark;

            foreach (string key in contents.Keys)
            {
                if (!personal.Contents.ContainsKey(key))
                {
                    personal.Contents.Add(key, contents[key]);
                }
                else
                {
                    personal.Contents[key] = contents[key];
                }
            }

            dao.SaveOrUpdate(personal);
            dao.Flush();

            return personal.Id;
        }
    }
}