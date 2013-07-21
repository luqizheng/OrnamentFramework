using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     片场，场馆下属的每一篇
    /// </summary>
    public class Yard : DomainObject<Yard, int>
    {
        /// <summary>
        ///     片场
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual YardType Type { get; set; }

        /// <summary>
        ///     单价
        /// </summary>
        public virtual decimal Price { get; set; }
    }
}