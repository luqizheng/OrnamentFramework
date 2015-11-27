using Ornament.Domain.Entities;

namespace Ornament.Identity
{
    public class IdentityUserClaim:ValueObject
    {
        public virtual string ClaimType { get; set; }

        public virtual string ClaimValue { get; set; }


    }
}