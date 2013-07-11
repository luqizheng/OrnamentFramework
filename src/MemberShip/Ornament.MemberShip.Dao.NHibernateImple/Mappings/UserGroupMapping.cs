using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserGroupMapping : SubclassMap<UserGroup>
    {
        public UserGroupMapping()
        {
            
            Extends(typeof(IPerformer));
            DiscriminatorValue("usergroup");
            KeyColumn("Id");
            Join("MBS_UserGroup",_ =>
                {
                    _.KeyColumn("Id");
                });
            
        }
    }
}