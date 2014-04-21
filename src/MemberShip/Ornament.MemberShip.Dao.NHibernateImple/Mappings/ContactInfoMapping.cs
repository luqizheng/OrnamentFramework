using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class ContactInfoMapping : ClassMap<User.ContactInfo>
    {
        public ContactInfoMapping()
        {
            Table(("MBS_UserContactInfo"));
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            References(s => s.User).ForeignKey("UserFK").Cascade.None();
            Map(s => s.Email).Length(64)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            Map(s => s.Phone).Length(20)
                             .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            Map(s => s.EmailVerified);
            Map(s => s.PhoneVerified);
        }
    }
}