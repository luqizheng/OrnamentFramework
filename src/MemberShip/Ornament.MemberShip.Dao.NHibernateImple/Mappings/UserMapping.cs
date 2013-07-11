using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserMapping : SubclassMap<User>
    {
        public UserMapping()
        {
            DiscriminatorValue("User");
            Extends(typeof(IPerformer));
            DynamicUpdate();
            //KeyColumn("Id");
            this.Join("MBS_User", d =>
                {
                    d.KeyColumn("Id");
                    d.Map(s => s.LoginId).Length(50).Unique();
                    d.Map(s => s.Password)
                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                        .Length(40);

                    d.Map(s => s.PasswordAnswer).Length(100)
                                              .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                    d.Map(s => s.PasswordQuestion).Length(100)
                                                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                    d.Map(s => s.CreateTime).Not.Update();

                    d.Map(s => s.IsLockout)
                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                    d.Map(s => s.IsApproved);
                    d.Map(s => s.Email).Length(64)
                                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                    d.Map(s => s.Phone).Length(20)
                                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);


                    d.Map(s => s.LastLockoutDate);
                    d.Map(s => s.LastLoginDate);
                    d.Map(s => s.LastActivityDate);
                    d.Map(s => s.LastPasswordChangedDate);


                    d.References(s => s.Org);

                    d.HasManyToMany(s => s.UserGroups).Table("MBS_UserGroupUserRelation")
                                              .ParentKeyColumn("UserId")
                                              .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                });

        }
    }


}