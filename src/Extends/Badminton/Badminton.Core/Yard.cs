using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton
{
    public class Yard : Qi.Domain.DomainObject<Yard, int>
    {
        public virtual string Name { get; set; }
        public virtual YardType Type { get; set; }
        public virtual decimal Price { get; set; }
    }

    public class YardType : Qi.Domain.DomainObject<YardType, int>
    {
        public virtual string Name { get; set; }
    }
}
