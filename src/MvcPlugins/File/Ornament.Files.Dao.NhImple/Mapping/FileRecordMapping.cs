using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;
using FluentNHibernate.Utils;
using NHibernate.Properties;
using Ornament.Files.IO;

namespace Ornament.Files.Dao.Mapping
{
    public class FileRecordMapping : ClassMap<FileRecord>
    {
        public FileRecordMapping()
        {
            this.Table("Files_FileRecord");
            this.Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            this.Map(s => s.Name);
            this.Map(s => s.FullPath);
            this.Map(s => s.CreateTime).Unique().Index("idx_createTime").Not.Update();
            this.Map(s => s.SignCode).Unique().Index("idx_signCode").Not.Update();

            this.References(s => s.Creator).ForeignKey("fr_creator_userFK");
        }
    }

    public class FileFormatMapping : ClassMap<FileFormatSetting>
    {
        public FileFormatMapping()
        {
            this.Table("Files_FileFormat");
            this.Id(s => s.Id).GeneratedBy.Increment();
            this.Map(s => s.SettingType);
            this.Map(s => s.SkipRow);
            this.Map(s => s.Name);

            this.HasMany(s => s.Settings).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }
    }

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
