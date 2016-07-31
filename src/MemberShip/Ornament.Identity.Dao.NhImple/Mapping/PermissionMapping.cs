using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public class PermissionMapping<TRole>: ClassMap<Permission<TRole>>

    {
        public PermissionMapping()
        {
            Table("mbs_permission");
            Id(s => s.Id).GeneratedBy.SequenceIdentity();
            DiscriminateSubClassesOnColumn("diff").Length(32).CustomType(typeof(string));
            Map(s => s.Name).Insert();
            Map(s => s.Operator);
            References(s => s.Role).ForeignKey("permission_roleFK");
        }
    }
}