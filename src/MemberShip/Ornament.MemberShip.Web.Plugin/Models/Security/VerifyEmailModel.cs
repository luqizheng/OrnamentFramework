using System;
using System.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Web.Plugin.Models.Security
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
        /// <param name="daoDaoFactory"></param>
        /// <returns></returns>
        public VerifyResult Verify(User loginUser, string token, IMemberShipDaoFactory daoDaoFactory)
        {
            if (loginUser != _emailVerifier.Account)
            {
                return VerifyResult.Failed;
            }

            if (_emailVerifier.Type == VerifyType.Email
                && _emailVerifier.Verify(token, daoDaoFactory) == VerifyResult.Success)
            {
                daoDaoFactory.CreateUserDao().SaveOrUpdate(loginUser);
                return VerifyResult.Success;
            }

            return VerifyResult.Failed;
        }

        /// <summary>
        /// </summary>
        /// <param name="daoDaoFactory"></param>
        /// <returns></returns>
        public bool Send(IMemberShipDaoFactory daoDaoFactory)
        {
            if (daoDaoFactory == null) throw new ArgumentNullException("daoDaoFactory");
            if (String.IsNullOrEmpty(Id))
                throw new ArgumentException("Id", "Id is empty");
            User myUsers = daoDaoFactory.CreateUserDao().Get(Id);
            if (myUsers == null)
            {
                throw new ArgumentException("Id", String.Format("can not find any use with id={0}", Id));
            }
            EmailVerifier token = myUsers.Contact.VerifyEmail(30, daoDaoFactory);

            var a=new Dictionary<string, string>
            {
                {"name", myUsers.Name},
                {"parameters", token.CreateQueryString()}
            };
            OrnamentContext.Configuration.MessagesConfig.VerifyEmailAddress.Send(daoDaoFactory, a, myUsers);

            daoDaoFactory.CreateUserDao().SaveOrUpdate(myUsers);
            return true;
        }
    }
}