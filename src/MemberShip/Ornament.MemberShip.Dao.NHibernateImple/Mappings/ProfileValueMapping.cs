using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class ProfileValueMapping : ClassMap<ProfileValue>
    {
        public ProfileValueMapping()
        {
            Id(s => s.Id).GeneratedBy.UuidHex("n");
            Table("MBS_Profile");
            DynamicInsert();
            DynamicUpdate();

            Map(s => s.IsAnonymous);
            Map(s => s.LoginId);
            Map(s => s.LastActivityDate);
            Map(s => s.StreamValues);
        }
    }
}