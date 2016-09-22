using FluentNHibernate.Mapping;
using Ornament.Identity.Enterprise;

namespace Ornament.Identity.Dao.NhImple.Mappings
{
    public class OrgMapping : ClassMap<Org>
    {
        public OrgMapping()
        {
            Id(_ => _.Id).GeneratedBy.Increment();
            Table("mbs_org");
            Map(_ => _.Name);
            Map(_ => _.Remark);
            References(s => s.Parent).Column("OrgParentId").ForeignKey("OrgParentFK");
            HasMany(_=>_.SubOrgs).KeyColumn("OrgParentId").Cascade.Delete();

        }
    }
}