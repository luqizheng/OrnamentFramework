using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton
{
    /// <summary>
    /// 场馆
    /// </summary>
    public class Gymnasium : Qi.Domain.DomainObject<Gymnasium,int>
    {
        public virtual string Name { get; set; }
        public virtual string Phone { get; set; }
        public virtual string Address { get; set; }
        public virtual string Remarks { get; set; }
    }
}
