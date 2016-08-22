using Ornament.Domain.Entities;

namespace Ornament.Identity.Enterprise
{
    public class Org : EntityWithTypedId<int>
    {
        public virtual string Name { get; set; }

        public virtual string Remark { get; set; }

        public virtual Org Parent { get; set; }
    }
}