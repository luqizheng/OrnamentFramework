using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.Consumableses
{
    public class CardMapping : SubclassMap<Card>
    {
        public CardMapping()
        {
            Table("Bad_Card");
            this.DiscriminatorValue("Card");
            this.Map(x => x.Number);
            this.References(x => x.Gymnasium);
            
        }

    }
}