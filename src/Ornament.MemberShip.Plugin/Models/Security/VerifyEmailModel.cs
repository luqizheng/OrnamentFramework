using System.Collections.Generic;
using System.Web.UI.WebControls;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.Messages.Notification;

namespace Ornament.MemberShip.Plugin.Models.Security
{
    public class VerifyEmailModel
    {
        private readonly EmailVerifier _emailVerifier;

        public VerifyEmailModel()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="emailVerifier"></param>
        public VerifyEmailModel(EmailVerifier emailVerifier)
        {
            _emailVerifier = emailVerifier;
            Id = _emailVerifier.Id;
        }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="loginUser"></param>
        /// <param name="token"></param>
        /// <param name="daoFactory"></param>
        /// <returns></returns>
        public VerifyResult Verify(User loginUser, string token, IMemberShipFactory daoFactory)
        {
            if (loginUser != _emailVerifier.Account)
            {
                return VerifyResult.Failed;
            }

            if (_emailVerifier.Type == VerifyType.Email
                && _emailVerifier.Verify(token, daoFactory) == VerifyResult.Success)
            {
                daoFactory.CreateUserDao().SaveOrUpdate(loginUser);
                return VerifyResult.Success;
            }

            return VerifyResult.Failed;
        }

        /// <summary>
        /// </summary>
        /// <param name="daoFactory"></param>
        /// <returns></returns>
        public bool Send(IMemberShipFactory daoFactory)
        {
            User myUsers = daoFactory.CreateUserDao().Get(Id);

            EmailVerifier token = myUsers.Contact.VerifyEmail(30, daoFactory);

            var deleage = new CreateVariablesHandler(user => new Dictionary<string, string>
            {
                {"name", user.Name},
                {"parameters", token.CreateQueryString()}
            });
            OrnamentContext.Configuration.MessagesConfig.VerifyEmailAddress.Publish(daoFactory, deleage, myUsers);

            daoFactory.CreateUserDao().SaveOrUpdate(myUsers);
            return true;
        }
    }
}