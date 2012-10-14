using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Qi;

namespace Ornament.Core.NHibernateTest.TimeTypeTests
{
    public class Tips
    {
        public virtual Guid Id
        {
            get;
            private set;
        }

        public virtual Time PerformTime
        {
            get;
            set;
        }

        public virtual Time PopupTime
        {
            get; set;
        }
    }
}
