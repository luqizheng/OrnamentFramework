using System;
using System.Security.Claims;

namespace Ornament.Identity
{
    /// <summary>
    /// Represents a claim that is granted to all users within a role.
    /// </summary>
    public class IdentityRoleClaim
    {
        /// <summary>
        /// Gets or sets the identifier for this role claim.
        /// </summary>
        /// <value>The identifier.</value>
        public virtual int Id { get; set; }

        ///// <summary>
        ///// Gets or sets the of the primary key of the role associated with this claim.
        ///// </summary>
        //public virtual TKey RoleId { get; set; }

        /// <summary>
        /// Gets or sets the claim type for this claim.
        /// </summary>
        /// <value>The type of the claim.</value>
        public virtual string ClaimType { get; set; }

        /// <summary>
        /// Gets or sets the claim value for this claim.
        /// </summary>
        /// <value>The claim value.</value>
        public virtual string ClaimValue { get; set; }

        /// <summary>
        /// To the claim.
        /// </summary>
        /// <returns>Claim.</returns>
        public virtual Claim ToClaim()
        {
            return new Claim(ClaimType, ClaimValue);
        }

        /// <summary>
        /// Initializes from claim.
        /// </summary>
        /// <param name="other">The other.</param>
        public virtual void InitializeFromClaim(Claim other)
        {
            ClaimType = other?.Type;
            ClaimValue = other?.Value;
        }
    }
}