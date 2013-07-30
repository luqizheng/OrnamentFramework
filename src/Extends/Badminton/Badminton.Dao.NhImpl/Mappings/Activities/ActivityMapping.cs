using Badminton.Activities;
using Badminton.Consumableses;
using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings.Activities
{
    public class ActivityMapping : ClassMap<Activity>
    {
        public ActivityMapping()
        {
            Table("Bad_Activity");
            Id(s => s.Id).GeneratedBy.UuidHex("N");
            Map(s => s.StartDateTime);
            Map(s => s.EndDateTime);

            HasMany(s => s.ConsumablesHistories)
                .Access
                .ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

            HasMany(s => s.JoinMembers)
                .Access
                .ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .Table("Bad_JoinMember")
                .Component(s =>
                    {
                        s.Map(_ => _.ActivityAmount);
                        s.Map(_ => _.ActualStatus);
                        s.Map(_ => _.PlanStatus);
                        s.References(_ => _.Member);
                    });
        }
    }
}
