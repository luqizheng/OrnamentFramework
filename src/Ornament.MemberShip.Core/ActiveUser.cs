using System;
using NHibernate;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip
{
    public class ActiveUser : DomainObject<ActiveUser, string>
    {
        public ActiveUser()
        {
            CreateTime = DateTime.Now;
            PrivateKey = Guid.NewGuid().ToString("N");
        }

        /// <summary>
        /// </summary>
        public virtual User User { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual string PrivateKey { get; protected set; }

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
            var singup = (user.LoginId + createtime + PrivateKey).Sha1Unicode().ToStringEx();

            return string.Format("id={0}&token={1}", Id, singup);
        }
    }
}