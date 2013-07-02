using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserGroupMapping : SubclassMap<UserGroup>
    {
        public UserGroupMapping()
        {
            Table("MBS_UserGroup");
            Extends(typeof(IPerformer));
            DiscriminatorValue("usergroup");
            KeyColumn("Id");
        }
    }
}