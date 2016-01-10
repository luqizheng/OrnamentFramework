using Ornament.Domain.Entities;

namespace Ornament.Identity
{
    /// <summary>
    /// </summary>
    public class IdentityRole<T> : EntityWithTypedId<T> 
    {
        /// <summary>
        /// </summary>
        public IdentityRole()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        public IdentityRole(string roleName) : this()
        {
            Name = roleName;
        }

        /// <summary>
        /// </summary>
        public virtual string NormalizedName { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }
    }
}