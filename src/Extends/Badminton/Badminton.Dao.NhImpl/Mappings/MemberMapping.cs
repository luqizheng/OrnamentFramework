using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class MemberMapping : ClassMap<Member>
    {
        public MemberMapping()
        {
            this.Table("Bad_Member");
            this.Id(s => s.Id);
            this.Map(s => s.Gender);
            this.Map(s => s.Balance);
        }
    }
}