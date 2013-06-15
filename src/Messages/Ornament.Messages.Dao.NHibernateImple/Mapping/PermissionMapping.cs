using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class PermissionMapping : SubclassMap<GenericPermission<NewsType>>
    {
        public PermissionMapping()
        {
            this.Table("Msgs_Permission");
            this.DiscriminatorValue("Info");
            this.References(x => x.Resource)
                .Column("InfoTypeId");
        }
    }
}