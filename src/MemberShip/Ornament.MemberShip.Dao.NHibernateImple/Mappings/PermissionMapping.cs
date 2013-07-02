using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class PermissionMapping : ClassMap<Permission>
    {
        public PermissionMapping()
        {
            Table("MBS_Permission");
            Id(s => s.Id).GeneratedBy.UuidHex("N");
            this.DiscriminateSubClassesOnColumn("diff").Length(32).CustomType(typeof(string));
            Map(s => s.Name).Insert();
            Map(s => s.Remark);
            Map(s => s.Operator);
        }
    }
}