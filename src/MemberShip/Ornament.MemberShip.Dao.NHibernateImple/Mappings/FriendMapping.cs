using FluentNHibernate.Mapping;
using Ornament.MemberShip.Relatives;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    //public class FriendMapping : ClassMap<Friend>
    //{
    //    public FriendMapping()
    //    {
    //        Table("MBS_Friend");
    //        Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
    //        References(s => s.User);
    //        Map(_ => _.Remakrs).Length(255);
    //        Map(_ => _.Name).Length(255);
    //    }
    //}

    public class FriendGroupMapping : ClassMap<FriendGroup>
    {
        public FriendGroupMapping()
        {
            Table("MBS_FriendGroup");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(_ => _.Name).Length(200);
            References(_ => _.Owner);
            HasManyToMany(s => s.Friends).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Component(x =>
                    {
                        x.Map(_ => _.Name);
                        x.Map(_ => _.Remakrs).Length(255);
                        x.References(_ => _.User);
                    }).Table("Mbs_Friends")
                    .ParentKeyColumn("groupId")
                    .ChildKeyColumn("friendId");
        }
    }
}