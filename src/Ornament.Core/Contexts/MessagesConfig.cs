using System.Collections.Generic;
using System.IO;
using System.Text;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Properties;
using Ornament.Retrives;
using Qi.IO.Serialization;

namespace Ornament.Contexts
{
    public class MessagesConfig
    {
        private static SimpleMessageFactoryRetrive _personalMessageId;
        private static SimpleMessageFactoryRetrive _verifyEmailAddress;
        private static SimpleMessageFactoryRetrive _passwordRetrive;
        private static NotifyTypeRetrive _systemId;
        private static SimpleMessageFactoryRetrive _registryAccount;
        private static SimpleMessageFactoryRetrive _accountChanged;
        public MessagesConfig()
        {
            _systemId = new NotifyTypeRetrive("System");
        }

        /// <summary>
        ///     System Notify Type.
        /// </summary>
        public NotifyType SystemType
        {
            get { return _systemId.Get(); }
        }

        /// <summary>
        /// </summary>
        public MessageTemplate RegistAccount
        {
            get
            {
                if (_registryAccount != null)
                {
                    _registryAccount = new SimpleMessageFactoryRetrive(
                        "Regist New User (Template)",
                        "Regist New user, and verify safe email address.",
                        SystemType,
                        DeserializerXml(Resources.registAccount_zh_CN, "zh-CN"),
                        DeserializerXml(Resources.registAccount, "en"),
                        DeserializerXml(Resources.registAccount_zh, "zh")
                        );
                }
                return _registryAccount.Get();
            }
        }

        public MessageTemplate EmailAddressChanged
        {
            get
            {
                if (_verifyEmailAddress == null)
                {
                    _verifyEmailAddress = new SimpleMessageFactoryRetrive(
                        "Verify Email Address (Template)",
                        "Email has changed, It should verify again.",
                        SystemType,
                        DeserializerXml(Resources.emailChanged_zh_CN, "zh-CN"),
                        DeserializerXml(Resources.emailChanged_zh, "zh"),
                        DeserializerXml(Resources.emailChanged, "en")
                        );
                }

                return _verifyEmailAddress.Get();
            }
        }

        public MessageTemplate RetrivePassword
        {
            get
            {
                if (_passwordRetrive == null)
                {
                    _passwordRetrive = new SimpleMessageFactoryRetrive(
                        "Verify Email Address (Template)",
                        "Email has changed, It should verify again.",
                        SystemType,
                        DeserializerXml(Resources.forgetPassword_zh_CN, "zh-CN"),
                        DeserializerXml(Resources.forgetPassword_zh, "zh"),
                        DeserializerXml(Resources.forgetPassword, "en")
                        );
                }

                return _passwordRetrive.Get();
            }
        }

        /// <summary>
        /// </summary>
        public MessageTemplate AccountChanged
        {
            get
            {

                if (_accountChanged == null)
                {
                    _accountChanged = new SimpleMessageFactoryRetrive(
                        "Verify Email Address (Template)",
                        "Email has changed, It should verify again.",
                        SystemType,
                        DeserializerXml(Resources.changeAccount_zh_CN, "zh-CN"),
                        DeserializerXml(Resources.changeAccount_zh, "zh"),
                        DeserializerXml(Resources.changeAccount, "en")
                        );
                }
                return _passwordRetrive.Get();
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


        private string CreateNotifyType(string name, string remark, IMessageTemplateDao dao,
                                        IDictionary<string, Content> contents)
        {
            MessageTemplate personal = dao.GetByName(name);
            if (personal != null)
                return personal.Id;
            personal = new MessageTemplate(SystemType) { Name = name };
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