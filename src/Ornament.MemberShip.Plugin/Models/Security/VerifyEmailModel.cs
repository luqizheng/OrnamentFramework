using System.Collections.Generic;
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

        public VerifyEmailModel(EmailVerifier emailVerifier)
        {
            _emailVerifier = emailVerifier;
            Id = _emailVerifier.Id;
        }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        public VerifyResult Verify(User loginUser, string token, IMemberShipFactory daoFactory)
        {
            if (loginUser != _emailVerifier.Account)
            {
                return VerifyResult.Failed;
            }

            if (_emailVerifier.Type == VerifyType.Email
                && _emailVerifier.Verify(token, daoFactory) == VerifyResult.Success)
            {
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
                {"paramers",token.CreateQueryString()}
            });
            OrnamentContext.Configuration.MessagesConfig.VerifyEmailAddress.Publish(daoFactory, deleage, myUsers);

            return true;
        }
    }
}