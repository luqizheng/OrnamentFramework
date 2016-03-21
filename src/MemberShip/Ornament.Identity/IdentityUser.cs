using System;
using System.Collections.Generic;
using Ornament.Domain.Entities;

namespace Ornament.Identity
{

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T">User's Id</typeparam>
    /// <typeparam name="TRole"></typeparam>
    /// <typeparam name="TRoleId"></typeparam>
    public class IdentityUser<T> : EntityWithTypedId<T>
     
    {
        public IdentityUser()
        {
            Claims = new List<IdentityUserClaim>();
            Logins = new List<IdentityUserLogin>();
        }

        public IdentityUser(string userName)
            : this()
        {
            if (userName == null) throw new ArgumentNullException(nameof(userName));
            UserName = userName;
        }

        public virtual int AccessFailedCount { get; set; }

        public virtual string NormalizedUserName { get; set; }

        public virtual string Email { get; set; }

        public virtual string NormalizedEmail { get; set; }

        public virtual bool EmailConfirmed { get; set; }

        public virtual bool LockoutEnabled { get; set; }

        public virtual DateTime? LockoutEndDateUtc { get; set; }

        public virtual string PasswordHash { get; set; }

        public virtual string PhoneNumber { get; set; }

        public virtual bool PhoneNumberConfirmed { get; set; }

        public virtual bool TwoFactorEnabled { get; set; }

        public virtual string UserName { get; set; }

        public virtual string SecurityStamp { get; set; }

        public virtual ICollection<IdentityRole> Roles { get; protected set; }

        public virtual ICollection<IdentityUserClaim> Claims { get; protected set; }

        public virtual ICollection<IdentityUserLogin> Logins { get; protected set; }
    }
}