using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ornament.Core.NHibernateTest.KeyValueCollectionTests
{
    public class Entity
    {
        public virtual Guid Id
        {
            get;
            private set;
        }
        Dictionary<String, string> collection;
        public virtual Dictionary<String, string> Collection
        {
            get
            {
                if (collection == null)
                    collection = new Dictionary<string, string>();
                return collection;
            }
        }
           
    }
}
