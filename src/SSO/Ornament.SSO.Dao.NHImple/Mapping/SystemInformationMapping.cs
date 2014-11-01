using FluentNHibernate.Mapping;
using Ornament.MemberShips.SSO;

namespace Ornament.SSO.Dao.NHImple.Mapping
{
    public class SystemInformationMapping:ClassMap<SystemInformation>
    {
        public SystemInformationMapping()
        {
            this.Id(s => s.Id).GeneratedBy.UuidString().Length(32);
            this.Map(s => s.Name).Length(64);
            this.Map(s=>s.PrivateKey).Length(4096);

        }
    }
}
