using System;
using System.Collections.Generic;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.Messages.Notification;

namespace Ornament
{
    public class MemberSecrityManager : IDisposable
    {
        private readonly IUserSecurityTokenDao _dao;
        private readonly IMemberShipFactory _memberShipFactory;

        private IDictionary<string, string> _variables;

        public MemberSecrityManager(IMemberShipFactory memberShipFactory,
                                    SmtpClient client, User user)
        {
            if (memberShipFactory == null)
                throw new ArgumentNullException("memberShipFactory");
            if (client == null)
            {
                throw new ArgumentNullException("client");
            }
            if (user == null) throw new ArgumentNullException("user");
            User = user;

            _dao = memberShipFactory.CreateUserSecurityTokenDao();
            _memberShipFactory = memberShipFactory;
        }

        /// <summary>
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// 获取Action。一般会被用于mvc的导航上面。这个Action对应是Controller的Action
        /// </summary>
        public string Action { get; set; }

        /// <summary>
        /// </summary>
        public int ExpireTimeMiniutes { get; set; }


        /// <summary>
        /// </summary>
        public IDictionary<string, string> Variables
        {
            get
            {
                return _variables ?? (_variables = new Dictionary<string, string>
                    {
                        {"site", OrnamentContext.Configuration.ApplicationSetting.SiteName}
                    });
            }
        }

        public void Dispose()
        {
        }


        /// <summary>
        ///     Send Token by emial.
        /// </summary>
        public void SendToken()
        {
            var token = new UserSecretToken(User, Action, ExpireTimeMiniutes);
            _dao.SaveOrUpdate(token);
            var deleage = new CreateVariablesHandler(user =>
                {
                    var dict = new Dictionary<string, string>();
                    dict.Add("url",
                             OrnamentContext.Configuration.ApplicationSetting.WebDomainUrl + "/Security/" + Action);
                    dict.Add("name", user.Name);

                    foreach (string key in Variables.Keys)
                    {
                        dict.Add(key, Variables[key]);
                    }
                    return dict;
                });


            OrnamentContext.Configuration.MessagesConfig.EmailAddressChanged
                           .Publish(_memberShipFactory, deleage, User);
        }


        public static MemberSecrityManager CreateEmailChangedToken(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "VerifyEmail",
                    ExpireTimeMiniutes = expireMiniutes
                };
            return manager;
        }

        /// <summary>
        ///     Create a new user and should need user to verify the email address.
        /// </summary>
        public static MemberSecrityManager CreateNewUser(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "VerifyEmail",
                    ExpireTimeMiniutes = expireMiniutes,
                };
            return manager;
        }

        /// <summary>
        ///     Create a new user and should need user to verify the email address.
        /// </summary>
        public static MemberSecrityManager ForgetPassword(User user, int expireMiniutes)
        {
            var manager = new MemberSecrityManager(OrnamentContext.DaoFactory.MemberShipFactory, new SmtpClient(), user)
                {
                    Action = "RetrievePassword",
                    ExpireTimeMiniutes = expireMiniutes,
                };
            return manager;
        }
    }
}