using FluentNHibernate.Mapping;
using Ornament.MemberShip;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MemberGroupMapping:SubclassMap<MemberGroup>
    {
        public MemberGroupMapping()
        {
            Extends(typeof(IPerformer));
            DiscriminatorValue("MemberGroup");
            Join("Bad_MemberGroup", _ => _.KeyColumn("Id"));
        }
    }
}