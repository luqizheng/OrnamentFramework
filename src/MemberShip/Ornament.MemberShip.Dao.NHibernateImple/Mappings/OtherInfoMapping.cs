using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class OtherInfoMapping : ClassMap<User.OtherUserInfo>
    {
        public OtherInfoMapping()
        {
            Table(("MBS_UserOtherInfo"));
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.CreateTime).Not.Update().LazyLoad();
            Map(s => s.LastLockoutDate).Not.Insert().LazyLoad();
            Map(s => s.UpdateTime).Not.Insert().LazyLoad();
            Map(s => s.LastActivityDate).Not.Insert();

        }
    }
}