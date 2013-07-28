using Qi.Domain;

namespace Badminton
{
    public class YardType : DomainObject<YardType, int>
    {
        public virtual string Name { get; set; }


        /// <summary>
        ///     单价
        /// </summary>
        public virtual decimal Price { get; set; }
    }
}