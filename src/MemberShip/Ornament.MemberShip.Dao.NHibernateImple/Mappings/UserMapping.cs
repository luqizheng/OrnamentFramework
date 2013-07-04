using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserMapping : SubclassMap<User>
    {
        public UserMapping()
        {
            Table("MBS_User");
            DiscriminatorValue("User");
            Extends(typeof(IPerformer));
            KeyColumn("Id");
            DynamicUpdate();

            Map(s => s.LoginId).Length(50).Unique();
            Map(s => s.Password)
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Length(40);

            Map(s => s.PasswordAnswer).Length(100)
                                      .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
            Map(s => s.PasswordQuestion).Length(100)
                                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            Map(s => s.CreateTime).Not.Update();

            Map(s => s.IsLockout)
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
            Map(s => s.IsApproved);
            Map(s => s.Email).Length(64)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            Map(s => s.Phone).Length(20)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);


            Map(s => s.LastLockoutDate);
            Map(s => s.LastLoginDate);
            Map(s => s.LastActivityDate);
            Map(s => s.LastPasswordChangedDate);


            References(_ => _.Org);

            HasMany(s => s.UserGroups).Table("MBS_UserGroupUserRelation")
                                      .KeyColumn("UserId").ForeignKeyConstraintName("FK_MBS_USERGROUP")
                                      .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }
    }


}