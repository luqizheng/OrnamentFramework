using FluentNHibernate.Mapping;

namespace Qi.CRM.Dao.NhImple.Mapping
{
    public class ClientModelMapping : ClassMap<ClientModel>
    {
        public ClientModelMapping()
        {
            Table("CRM_ClientModel");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.Name);
        }
    }
}