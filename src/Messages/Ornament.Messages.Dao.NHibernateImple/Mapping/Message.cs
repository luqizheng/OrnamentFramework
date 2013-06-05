using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class MessageMapping : ClassMap<Message>
    {
        public MessageMapping()
        {
            this.Table("Msgs_Message");
            Id(x => x.Id).GeneratedBy.UuidHex("N");
            this.Version(s => s.Version).Generated.Always();
            this.Map(x => x.CreateTime);
            this.Map(x => x.Priority);
            this.Map(x => x.EffectTime);
            this.Map(x => x.State);
            this.Map(x => x.PublishTime);
            this.References(x => x.Publisher);
            this.References(x => x.Type);
            this.HasMany(x => x.Contents)
                .AsMap(x => x.Language)
                .Table("Msgs_Content")
                .Component(x => x.Map(a => a.Value));
            this.HasMany(x => x.Readers).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }
    }


}
