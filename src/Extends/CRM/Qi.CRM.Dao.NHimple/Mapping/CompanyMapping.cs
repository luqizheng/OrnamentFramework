using FluentNHibernate.Mapping;

namespace Qi.CRM.Dao.NhImple.Mapping
{
    public class CompanyMapping : ClassMap<Company>
    {
        public CompanyMapping()
        {
            Table("CRM_Company");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.Name);
            HasMany(s => s.Contacts)
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Component(x =>
                    {
                        x.Map(_ => _.Contact);
                        x.Map(_ => _.Content);
                        x.Map(_ => _.Name);
                    }).Table("CRM_CompanyContact").KeyColumn("CompanyId");

        }
    }
}