﻿using System;
using NHibernate;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip.Secret
{
    /// <summary>
    /// </summary>
    public class UserSecretToken : DomainObject<UserSecretToken, string>
    {
        public UserSecretToken()
        {
            CreateTime = DateTime.Now;
            PrivateKey = Guid.NewGuid().ToString("N");
        }

        public virtual ActiveUserAction Action { get; set; }

        /// <summary>
        /// </summary>
        public virtual User Account { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     Gets the PrivateKey of this token, it's auto create
        /// </summary>
        public virtual string PrivateKey { get; protected set; }

        /// <summary>
        ///     this AtciveUser token expire time, unit is minis
        /// </summary>
        public virtual int ExpireTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual bool IsExpire
        {
            get
            {
                TimeSpan now = DateTime.Now - CreateTime;
                return now.TotalMinutes > ExpireTime;
            }
        }

        public virtual bool Verify(string token)
        {
            return CreateToken(Account) == token;
        }

        private string CreateToken(User user)
        {
            return (user.LoginId + CreateTime.ToString("yyyy-MM-dd") + PrivateKey).Sha1Unicode().ToStringEx();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string CreateQueryString()
        {
            if (IsTransient())
                throw new PersistentObjectException("Please save the object after to build the QueryString.");


            return string.Format("id={0}&token={1}", Id, CreateToken(Account));
        }

        public virtual void Renew()
        {
            CreateTime = DateTime.Now;
        }

        public static UserSecretToken RetrievePassword(User user, int expireMins)
        {
            return new UserSecretToken
                {
                    Account = user,
                    ExpireTime = expireMins,
                    Action = ActiveUserAction.ChangePassword
                };
        }


        public static UserSecretToken VerifyEmail(User user, int expireMinis)
        {
            return new UserSecretToken
                {
                    Account = user,
                    Action = ActiveUserAction.Verify,
                    ExpireTime = expireMinis
                };
        }
    }
}