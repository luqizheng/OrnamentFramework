using System;
using Ornament.MemberShip.Dao;
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

    public enum VerifyType
    {
        Email,
        ResetPassword,
    }

    public enum VerifyResult
    {
        NotFoundTokenId,
        Success,
        Failed,
        Expire
    }

    /// <summary>
    /// </summary>
    public class EmailVerifier : DomainObject<EmailVerifier, string>
    {
        private SecretTokenStatus _status;

        protected EmailVerifier()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="account"></param>
        /// <param name="expireTimeMinutes"></param>
        /// <param name="verifyType"></param>
        public EmailVerifier(User account, int expireTimeMinutes, VerifyType verifyType)
        {
            if (account == null)
                throw new ArgumentNullException("account");

            if (expireTimeMinutes <= 0)
            {
                throw new ArgumentOutOfRangeException("expireTimeMinut should be larger than 0.");
            }
            CreateTime = DateTime.Now;
            PrivateKey = Guid.NewGuid().ToString("N");
            Account = account;
            ExpireTime = expireTimeMinutes;
            Type = verifyType;
        }

        /// <summary>
        /// </summary>
        public virtual VerifyType Type { get; protected set; }

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
        /// </summary>
        public virtual User Account { get; protected set; }

        /// <summary>
        ///     Gets the token createTime
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
        /// <param name="daoFactory"></param>
        /// <returns></returns>
        /// <exception cref="EmailSecurityTimeoutException">User Token is Timeout</exception>
        public virtual VerifyResult Verify(string token, IMemberShipFactory daoFactory)
        {
            VerifyResult re = Verify(token);
            daoFactory.CreateEmailVerifierDao().SaveOrUpdate(this);
            return re;
        }

        /// <summary>
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public virtual VerifyResult Verify(string token)
        {
            if (String.IsNullOrEmpty(token))
                throw new ArgumentNullException("token");
            if (IsExpire)
            {
                return VerifyResult.Expire;
            }
            if (Status == SecretTokenStatus.Success)
            {
                return VerifyResult.Expire;
            }
            if (CreateToken(Account) == token)
            {
                _status = SecretTokenStatus.Success;
                VerifyTime = DateTime.Now;
                return VerifyResult.Success;
            }
            return VerifyResult.Failed;
        }

        public virtual VerifyResult TryVerify(string token)
        {
            if (String.IsNullOrEmpty(token))
                throw new ArgumentNullException("token");
            if (IsExpire)
            {
                return VerifyResult.Expire;
            }
            if (Status == SecretTokenStatus.Success)
            {
                return VerifyResult.Expire;
            }
            if (CreateToken(Account) == token)
            {
                return VerifyResult.Success;
            }
            return VerifyResult.Failed;
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

            return string.Format("{2}{3}id={0}&token={1}&type={4}", Id, CreateToken(Account), domainUrl,
                domainUrl.Contains("?") ? "&" : "?", Type);
        }

        /// <summary>
        /// </summary>
        public virtual void Expire()
        {
            _status = SecretTokenStatus.Expire;
        }
    }
}