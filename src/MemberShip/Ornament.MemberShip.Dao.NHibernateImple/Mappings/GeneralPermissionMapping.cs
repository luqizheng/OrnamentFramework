using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class GeneralPermissionMapping : SubclassMap<GenericPermission<string>>
    {
        public GeneralPermissionMapping()
        {
            Extends(typeof (Permission));
            DiscriminatorValue("Kind");
            Map(s => s.Resource).Column("TypeResource").Length(64);
        }
    }
}