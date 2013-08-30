using System;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip.Security
{
    public enum SecretTokenStatus
    {
        /// <summary>
        ///     It's normal and waitting some one to use it.
        /// </summary>
        Effective,

        /// <summary>
        ///     Token is Timeout
        /// </summary>
        Expire,

        /// <summary>
        ///     Token has been used
        /// </summary>
        Success,
    }

    /// <summary>
    /// </summary>
    public class UserSecretToken : DomainObject<UserSecretToken, string>
    {
        private SecretTokenStatus _status;

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
            CreateTime = DateTime.Now;
            PrivateKey = Guid.NewGuid().ToString("N");
            Account = account;
            Action = action;
            ExpireTime = expireTimeMinutes;
        }

        public virtual SecretTokenStatus Status
        {
            get
            {
                if (_status == SecretTokenStatus.Effective)
                {
                    if (IsExpire)
                    {
                        _status = SecretTokenStatus.Expire;
                    }
                }
                return _status;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public virtual string Action { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual User Account { get; protected set; }

        /// <summary>
        /// Gets the token createTime
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     this token is Effective for current user;
        /// </summary>
        public virtual DateTime? VerifyTime { get; protected set; }

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
        private bool IsExpire
        {
            get
            {
                if (VerifyTime != null)
                    return true;
                TimeSpan now = DateTime.Now - CreateTime;
                return now.TotalMinutes > ExpireTime;
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        /// <exception cref="UserSecurityTimeoutException">User Token is Timeout</exception>
        public virtual bool Verify(string token)
        {
            if (String.IsNullOrEmpty(token))
                throw new ArgumentNullException("token");
            if (Status == SecretTokenStatus.Expire)
            {
                throw new UserSecurityTimeoutException();
            }
            if (Status == SecretTokenStatus.Success)
            {
                throw new UserSecurityException("this token is veirfy by another one, can't be use again");
            }
            if (CreateToken(Account) == token)
            {
                _status = SecretTokenStatus.Success;
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

        /// <summary>
        /// </summary>
        /// <param name="domainUrl"></param>
        /// <returns></returns>
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

        /// <summary>
        /// </summary>
        public virtual void Expire()
        {
            _status = SecretTokenStatus.Expire;
        }
    }
}