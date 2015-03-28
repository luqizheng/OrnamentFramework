using FluentNHibernate.Mapping;
using Ornament.Files.IO;

namespace Ornament.Files.Dao.Mapping
{
    public class FieldSettingMapping : ClassMap<FieldSetting>
    {
        public FieldSettingMapping()
        {
            this.Table("Files_ColumnSetting");
            this.Id(s => s.Id).GeneratedBy.Increment();
            this.Map(s => s.Name);
            this.DiscriminateSubClassesOnColumn("SettingType").ReadOnly();
        }
    }

    public class ColumnFileSettingMapping : SubclassMap<CloumnFieldSetting>
    {
        public ColumnFileSettingMapping()
        {
            DiscriminatorValue("Column");
            Map(s => s.Index);
        }
    }

    public class FixLengthFileSettingMapping : SubclassMap<FixLengthFieldSetting>
    {
        public FixLengthFileSettingMapping()
        {
            DiscriminatorValue("FixLength");
            Map(s => s.Start);
            Map(s => s.Length);
        }
    }
}