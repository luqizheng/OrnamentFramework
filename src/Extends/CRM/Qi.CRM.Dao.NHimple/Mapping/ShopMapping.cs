using FluentNHibernate.Mapping;

namespace Qi.CRM.Dao.NhImple.Mapping
{
    public class ShopMapping : ClassMap<Shop>
    {
        public ShopMapping()
        {
            Table("CRM_Shop");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            HasMany(s => s.Contacts)
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Component(x =>
                    {
                        x.Map(_ => _.Contact);
                        x.Map(_ => _.Content);
                        x.Map(_ => _.Name);
                    }).Table("CRM_ShopContact").KeyColumn("CompanyId");

        }
    }
}