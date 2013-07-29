using FluentNHibernate.Mapping;
using Ornament.MemberShip;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MemberMapping : SubclassMap<Member>
    {
        public MemberMapping()
        {
            Extends(typeof(IPerformer));
            DiscriminatorValue("Member");
            Join("Bad_Member", _ => _.KeyColumn("Id"));
            this.Map(s => s.Gender);
            this.Map(s => s.Balance);
            this.References(s => s.User);
        }
    }
}