using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.Domain;

namespace Ornament.Web.DashBoard
{
    public class Shortcut : DomainObject<Guid>
    {
        public virtual string Image
        {
            get;
            set;
        }

        public virtual string Tooltip
        {
            get;
            set;
        }

        public virtual string Text
        {
            get;
            set;
        }

        public virtual string Url
        {
            get;
            set;
        }

        protected override int CreateHashCode()
        {
            return Url.GetHashCode();
        }
    }
}
