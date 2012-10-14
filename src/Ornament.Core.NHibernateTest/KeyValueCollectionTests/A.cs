using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ornament.Core.NHibernateTest.KeyValueCollectionTests
{
    public class A
    {
        public virtual int Id{ get; set;}
        public virtual string Name{ get; set;}
        public virtual Guid RefId{ get; set;}
    }
    public class  B
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual Guid RefId { get; set; }
    }
}
