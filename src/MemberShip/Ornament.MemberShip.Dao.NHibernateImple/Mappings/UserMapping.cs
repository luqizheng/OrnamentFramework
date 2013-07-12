using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserMapping : SubclassMap<User>
    {
        public UserMapping()
        {
            DiscriminatorValue("User");
            Extends(typeof (IPerformer));
            
            DynamicUpdate();
            //KeyColumn("Id");
            Join("MBS_User", d =>
                {
                    d.KeyColumn("Id");
                    d.Map(s => s.LoginId).Length(50).Unique();
                    d.Map(s => s.IsApproved)
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                        //Map to _isApprove,avoid change theUpdate time.

                    d.Map(s => s.IsLockout)
                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                    d.Map(s => s.TimeZoneId).Length(64);
                    d.Map(s => s.Language).Length(32);
                    d.References(s => s.Org);

                    d.HasManyToMany(s => s.UserGroups).Table("MBS_UserGroupUserRelation")
                     .ParentKeyColumn("UserId")
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                    d.References(s => s.Other)
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                     .Cascade.All();

                    d.References(s => s.Contact).Cascade.All()
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                    d.References(s => s.Security).Cascade.All()
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                });
        }
    }
}