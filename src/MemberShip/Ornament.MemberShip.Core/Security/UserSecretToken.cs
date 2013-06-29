using System;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip.Security
{
    /// <summary>
    /// </summary>
    public class UserSecretToken : DomainObject<UserSecretToken, string>
    {
        protected UserSecretToken()
        {

        }

        public UserSecretToken(User account, string action, int expireTimeMinutes)
        {
            if (account == null) throw new ArgumentNullException("account");
            if (action == null) throw new ArgumentNullException("action");
            if (expireTimeMinutes <= 0)
            {
                throw new ArgumentOutOfRangeException("expireTimeMinut should be larger than 0.");
            }
            IsEffective = true;
            CreateTime = DateTime.Now;
            PrivateKey = Guid.NewGuid().ToString("N");

            this.Account = account;
            this.Action = action;
            this.ExpireTime = expireTimeMinutes;
        }
        public virtual string Action { get; set; }

        /// <summary>
        /// </summary>
        public virtual User Account { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual DateTime? VerifyTime { get; set; }

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
                if (VerifyTime != null)
                    return true;
                TimeSpan now = DateTime.Now - CreateTime;
                return now.TotalMinutes > ExpireTime;
            }
        }

        public virtual bool IsEffective { get; set; }

        public virtual bool Verify(string token)
        {
            if (String.IsNullOrEmpty(token))
                throw new ArgumentNullException("token");

            if (CreateToken(Account) == token)
            {
                VerifyTime = DateTime.Now;
                return true;
            }
            return false;
        }

        private string CreateToken(User user)
        {
            return (user.LoginId + CreateTime.ToString("yyyy-MM-dd") + PrivateKey + Action).Sha1Unicode().ToStringEx();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string CreateQueryString()
        {
            if (IsTransient())
                throw new Exception("Please save the object after to build the QueryString.");
            return string.Format("id={0}&token={1}", Id, CreateToken(Account));
        }

        public virtual string CreateQueryString(string domainUrl)
        {
            if (IsTransient())
                throw new Exception("Please save the object after to build the QueryString.");
            if (domainUrl.EndsWith("/"))
            {
                domainUrl = domainUrl.TrimEnd('/');
            }
            return string.Format("{2}?id={0}&token={1}", Id, CreateToken(Account), domainUrl);
        }
    }
}