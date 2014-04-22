using FluentNHibernate.Mapping;
using Ornament.MemberShip.Relatives;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class FriendGroupMapping : ClassMap<FriendGroup>
    {
        public FriendGroupMapping()
        {
            Table("MBS_FriendGroup");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(_ => _.Name).Length(200);
            References(_ => _.Owner).ForeignKey("OwerUserIdFK");
            HasManyToMany(s => s.Friends).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Component(x =>
                {
                    x.Map(_ => _.Name);
                    x.Map(_ => _.Remakrs).Length(255);
                    x.References(_ => _.User).ForeignKey("FriendGroupUserIdFK");
                }).Table("MBS_Friends")
                .ParentKeyColumn("groupId")
                .ChildKeyColumn("friendId");
        }
    }
}