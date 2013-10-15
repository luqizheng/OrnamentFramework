using FluentNHibernate.Mapping;

namespace Sand.Dao.NhImple.Mapping
{
    public class ShopMemoMapping : ClassMap<ShopMemo>
    {
        public ShopMemoMapping()
        {
            Table("CRM_Shop");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            References(s => s.Shop);
            Map(s => s.Content).Length(5000);
            Map(s => s.CreateTime).Not.Update();
        }
    }
}