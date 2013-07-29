using Qi.Domain;

namespace Badminton.Consumableses
{
    public class Brand : DomainObject<Brand, int>
    {
        public virtual string Name { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}