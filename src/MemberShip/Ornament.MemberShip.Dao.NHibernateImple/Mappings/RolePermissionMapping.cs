using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    /// <summary>
    /// Role 许可证
    /// </summary>
    public class RolePermissionMapping : SubclassMap<GenericPermission<Role>>
    {
        public RolePermissionMapping()
        {
            DiscriminatorValue("RoleRes");
            this.References(x => x.Resource).ForeignKey("mbs_role_resFK")
               .Column("RoleId");
        }
    }
}