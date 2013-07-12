using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserGroupMapping : SubclassMap<UserGroup>
    {
        public UserGroupMapping()
        {
            
            Extends(typeof(IPerformer));
            DiscriminatorValue("usergroup");
            Join("MBS_UserGroup",_ => _.KeyColumn("Id"));
            
        }
    }
}