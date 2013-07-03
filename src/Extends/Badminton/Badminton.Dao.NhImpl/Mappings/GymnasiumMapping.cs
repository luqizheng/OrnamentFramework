using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Badminton.Dao.NhImpl.Mappings
{
    public class GymnasiumMapping : ClassMap<Gymnasium>
    {
        public GymnasiumMapping()
        {
            this.Table("Bad_Gymnasium");
            this.Id(s => s.Id).GeneratedBy.Identity();
            this.Map(s => s.Name).Length(50);
            this.Map(s => s.Phone).Length(100);
            this.Map(s => s.Address).Length(200);
            this.Map(s => s.Remarks).Length(200);
            this.HasMany(s => s.Yards).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }

    }
}
