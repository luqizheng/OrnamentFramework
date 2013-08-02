using FluentNHibernate.Mapping;
using Ornament.MemberShip.Relatives;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class FriendMapping : ClassMap<Friend>
    {
        public FriendMapping()
        {
            Table("MBS_Friend");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            References(s => s.Owner);
            References(s => s.Relative);
            Map(_ => _.Memo).Length(255);
            Map(_ => _.Group).Length(255);

        }
    }
}