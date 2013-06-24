using System.Collections.Generic;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Contexts
{
    public class MessagesConfig
    {
        public const string AccountNotifyChangeName = "Account changed(Inside)";
        public const string RegistUserName = "Regist New Account(Inside)";
        public const string VerifyEmailAddress = "Verify Email Address(Inside)";
        private static string _personalMessageId;
        private static string _registId;
        private static string _verifyEmailAddressId;

        /// <summary>
        /// </summary>
        public NotifyType RegistAccountName
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_personalMessageId == null)
                {
                    _personalMessageId = CreateNotifyType(AccountNotifyChangeName, dao,
                                                          new Dictionary<string, Content>());
                }
                return dao.Get(_personalMessageId);
            }
        }

        public NotifyType VerifyEmailAddressName
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_verifyEmailAddressId == null)
                {
                    _verifyEmailAddressId = CreateNotifyType(VerifyEmailAddress, dao, new Dictionary<string, Content>());
                }
                return dao.Get(_verifyEmailAddressId);
            }
        }

        /// <summary>
        /// </summary>
        public NotifyType RegistUser
        {
            get
            {
                INotifyTypeDao dao = OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao;
                if (_registId == null)
                {
                    _registId = CreateNotifyType(RegistUserName, dao, new Dictionary<string, Content>());
                }
                return dao.Get(_registId);
            }
        }


        public string CreateNotifyType(string name, INotifyTypeDao dao, IDictionary<string, Content> contents)
        {
            NotifyType personal = dao.GetByName(name) ?? new NotifyType();
            personal.Name = name;
            if (string.IsNullOrEmpty(personal.Id))
            {
                dao.SaveOrUpdate(personal);
                dao.Flush();
            }


            return personal.Id;
        }
    }
}