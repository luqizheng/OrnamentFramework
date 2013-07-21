using Qi.Domain;

namespace Badminton
{
    public class YardType : DomainObject<YardType, int>
    {
        public virtual string Name { get; set; }
    }
}