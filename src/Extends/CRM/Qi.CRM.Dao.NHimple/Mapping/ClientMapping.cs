using FluentNHibernate.Mapping;

namespace Qi.CRM.Dao.NhImple.Mapping
{
    public class ClientMapping : ClassMap<Client>
    {

        public ClientMapping()
        {
            Table("CRM_Client");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.Code);
            References(s => s.Model);
        }
    }
}