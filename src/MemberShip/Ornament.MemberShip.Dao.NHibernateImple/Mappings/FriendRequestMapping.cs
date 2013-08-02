using FluentNHibernate.Mapping;
using Ornament.MemberShip.Relatives;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class FriendRequestMapping : ClassMap<FriendRequest>
    {
        public FriendRequestMapping()
        {
            Table("MBS_FriendRequest");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            References(s => s.RequestUser);
            References(s => s.Target);
            Map(_ => _.Msg).Length(255);

        }
    }
}