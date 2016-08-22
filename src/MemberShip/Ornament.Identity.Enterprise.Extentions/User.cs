using System;

namespace Ornament.Identity.Enterprise
{
    public class User<TKey, TRole> : IdentityUser<TKey, TRole>
        where TKey : IEquatable<TKey>

    {
        public virtual Org Org { get; set; }
    }
}