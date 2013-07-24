using FluentNHibernate.Mapping;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class AnnouncementMapping : ClassMap<Announcement>
    {
        public AnnouncementMapping()
        {
            Table("Msgs_AnnouncementMessage");
            Id(x => x.Id).GeneratedBy.Increment();
            DynamicUpdate();
            Map(x => x.ModifyTime);
            Map(x => x.EditState);
            References(x => x.Type);

            HasMany(x => x.Contents)
                .AsMap(s => s.Language).Cascade.AllDeleteOrphan()
                .Table("Msgs_AnnouncementContent")
                .Component(x =>
                    {
                        x.Map(a => a.Value).Length(4096);
                        x.Map(a => a.Subject).Length(255);
                        x.Map(a => a.Language, "language2");
                    }
                );

        }
    }
}