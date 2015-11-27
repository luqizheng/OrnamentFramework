using Ornament.Domain.Entities;

namespace Ornament.Identity
{

    public class IdentityUserLogin : ValueObject
    {
        public virtual string LoginProvider { get; set; }

        /// <summary>
        ///     Key representing the login for the provider
        /// </summary>
        public virtual string ProviderKey { get; set; }

        /// <summary>
        ///     Display name for the login
        /// </summary>
        public virtual string ProviderDisplayName { get; set; }
    }
}