using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class RolePermissionMapping : SubclassMap<GenericPermission<Role>>
    {
        public RolePermissionMapping()
        {
            DiscriminatorValue("RoleRes");
        }
    }
}