using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ornament.Domain.Entities;

namespace Ornament.Identity.Enterprise
{
    public class Org : EntityWithTypedId<int>
    {
        private IList<Org> _subOrgs;
        [Required]
        public virtual string Name { get; set; }
        [MaxLength(256)]
        public virtual string Remark { get; set; }

        public virtual Org Parent { get; set; }

        public virtual IEnumerable<Org> SubOrgs
        {
            get { return _subOrgs ?? (_subOrgs = new List<Org>()); }
            protected internal set { _subOrgs = (IList<Org>)value; }
        }

        public virtual void Add(Org org)
        {
            var list = (IList<Org>)SubOrgs;
            org.Parent = org;
            list.Add(org);
        }

        public virtual Org Remove(Org org)
        {
            lock (SubOrgs)
            {
                var list = (IList<Org>)SubOrgs;
                list.RemoveAt(list.IndexOf(org));
                org.Parent = null;
            }
            return org;
        }
    }
}