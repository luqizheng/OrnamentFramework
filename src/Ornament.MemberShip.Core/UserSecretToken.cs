using System;
using NHibernate;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip
{
    public enum ActiveUserAction
    {
        ChangePassword,
        Verify,
    }
    /// <summary>
    /// 
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
        public virtual User User { get; protected set; }

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

        public virtual bool IsExpire
        {
            get
            {
                TimeSpan now = DateTime.Now - CreateTime;
                return now.TotalMinutes > ExpireTime;
            }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string CreateQueryString(User user)
        {
            if (Id != null)
                throw new PersistentObjectException("Please save the object after to build the QueryString.");
            if (user == null)
                throw new ArgumentNullException("user");
            string createtime = CreateTime.ToString("yyyy-MM-dd");
            string singup = (user.LoginId + createtime + PrivateKey).Sha1Unicode().ToStringEx();

            return string.Format("id={0}&token={1}", Id, singup);
        }

        public static UserSecretToken RetrievePassword(User user, int expireMins)
        {
            return new UserSecretToken
                {
                    User = user,
                    ExpireTime = expireMins,
                    Action = ActiveUserAction.ChangePassword
                };
        }
    }
}