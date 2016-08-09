using System;
using System.Collections.Generic;
using Ornament.Domain.Entities;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// The Identity namespace.
/// </summary>
namespace Ornament.Identity
{

    /// <summary>
    /// Represents a user in the identity system
    /// </summary>
    /// <typeparam name="TKey">The type used for the primary key for the user.</typeparam>
    /// <typeparam name="TRole">The type representing a user role.</typeparam>
    /// <seealso cref="Ornament.Domain.Entities.EntityWithTypedId{TKey}" />
    public class IdentityUser<TKey, TRole>
        : EntityWithTypedId<TKey>
        where TKey : IEquatable<TKey>


    {
        /// <summary>
        /// Initializes a new instance of <see cref="IdentityUser{TKey}" />.
        /// </summary>
        public IdentityUser()
        {
        }

        /// <summary>
        /// Initializes a new instance of <see cref="IdentityUser{TKey}" />.
        /// </summary>
        /// <param name="userName">The user name.</param>
        public IdentityUser(string loginId) : this()
        {
            LoginId = loginId;
        }

        /// <summary>
        /// Gets or sets the ID.
        /// </summary>
        /// <value>The identifier.</value>
        /// Gets or sets the primary key for this user.
        /// <remarks>The ID may be of type <c>string</c>, <c>int</c>, a custom type, etc.
        /// The setter is protected to allow unit tests to set this property via reflection
        /// and to allow domain objects more flexibility in setting this for those objects
        /// with assigned IDs. It's virtual to allow NHibernate-backed objects to be lazily
        /// loaded. This is ignored for XML serialization because it does not have a public
        /// setter (which is very much by design). See the FAQ within the documentation if
        /// {D255958A-8513-4226-94B9-080D98F904A1}{D255958A-8513-4226-94B9-080D98F904A1}you'd like to have the ID XML serialized.</remarks>
        public new virtual TKey Id
        {
            get { return base.Id; }
            set { base.Id = value; }
        }
        [Display(Name = "Name", ResourceType = typeof(Resource))]
        public virtual string Name { get; set; }


        /// <summary>
        /// Gets or sets the normalized user name for this user.
        /// </summary>
        /// <value>The name of the normalized user.</value>
        [Display(Name = "LoginId", ResourceType = typeof(Resource))]
        public virtual string LoginId { get; set; }



        /// <summary>
        /// Gets or sets the normalized email address for this user.
        /// </summary>
        /// <value>The normalized email.</value>
        [Display(Name = "Email", ResourceType = typeof(Resource))]
        public virtual string Email { get; set; }

        /// <summary>
        /// Gets or sets a flag indicating if a user has confirmed their email address.
        /// </summary>
        /// <value>True if the email address has been confirmed, otherwise false.</value>
        public virtual bool EmailConfirmed { get; set; }

        /// <summary>
        /// Gets or sets a salted and hashed representation of the password for this user.
        /// </summary>
        /// <value>The password hash.</value>
        public virtual string PasswordHash { get; set; }

        /// <summary>
        /// A random value that must change whenever a users credentials change (password changed, login removed)
        /// </summary>
        /// <value>The security stamp.</value>
        public virtual string SecurityStamp { get; set; }

        /// <summary>
        /// A random value that must change whenever a user is persisted to the store
        /// </summary>
        /// <value>The concurrency stamp.</value>
        public virtual string ConcurrencyStamp { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// Gets or sets a telephone number for the user.
        /// </summary>
        /// <value>The phone number.</value>
        [Display(Name = "PhoneNumber", ResourceType = typeof(Resource))]

        public virtual string PhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets a flag indicating if a user has confirmed their telephone address.
        /// </summary>
        /// <value>True if the telephone number has been confirmed, otherwise false.</value>
        public virtual bool PhoneNumberConfirmed { get; set; }

        /// <summary>
        /// Gets or sets a flag indicating if two factor authentication is enabled for this user.
        /// </summary>
        /// <value>True if 2fa is enabled, otherwise false.</value>
        public virtual bool TwoFactorEnabled { get; set; }

        /// <summary>
        /// Gets or sets the date and time, in UTC, when any user lockout ends.
        /// </summary>
        /// <value>The lockout end.</value>
        /// <remarks>A value in the past means the user is not locked out.</remarks>
        [Display(Name = "PhoneNumber", ResourceType = typeof(Resource))]
        public virtual DateTimeOffset? LockoutEnd { get; set; }

        /// <summary>
        /// Gets or sets a flag indicating if the user could be locked out.
        /// </summary>
        /// <value>True if the user could be locked out, otherwise false.</value>
        public virtual bool LockoutEnabled { get; set; }

        /// <summary>
        /// Gets or sets the number of failed login attempts for the current user.
        /// </summary>
        /// <value>The access failed count.</value>
        public virtual int AccessFailedCount { get; set; }

        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        /// <value>The roles.</value>
        public virtual ICollection<TRole> Roles { get; } = new List<TRole>();

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        /// <value>The claims.</value>
        public virtual ICollection<IdentityUserClaim> Claims { get; } = new List<IdentityUserClaim>();

        /// <summary>
        /// Navigation property for this users login accounts.
        /// </summary>
        /// <value>The logins.</value>
        public virtual ICollection<IdentityUserLogin> Logins { get; } = new List<IdentityUserLogin>();

        /// <summary>
        /// Returns the username for this user.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            return LoginId;
        }
    }
}