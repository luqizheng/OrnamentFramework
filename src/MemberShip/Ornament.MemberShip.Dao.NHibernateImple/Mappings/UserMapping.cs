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
            Join("MBS_User", d =>
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


                    d.Map(s => s.IsLockout).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                    d.Map(s => s.IsApproved);

                    d.Component(_ => _.OtherInfo, c =>
                        {
                            c.Map(s => s.CreateTime).Not.Update();
                            c.Map(s => s.LastLockoutDate);
                            c.Map(s => s.LastLoginDate);
                            c.Map(s => s.LastActivityDate);
                            c.Map(s => s.LastPasswordChangedDate);
                        });

                    d.Map(s => s.TimeZoneId).Length(64);
                    d.Map(s => s.Language).Length(32);
                    d.References(s => s.Org);
                    d.HasManyToMany(s => s.UserGroups).Table("MBS_UserGroupUserRelation")
                     .ParentKeyColumn("UserId")
                     .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);


                    d.References(s => s.Contact).Cascade.All()
                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
                });
        }
    }

    public class ContactInfoMapping : ClassMap<User.ContactInfo>
    {
        public ContactInfoMapping()
        {
            Table(("MBS_UserContactInfo"));
            Id(s => s.Id).GeneratedBy.UuidHex("N");
            HasOne(s => s.User);
            Map(s => s.Email).Length(64)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            Map(s => s.Phone).Length(20)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }
    }
}