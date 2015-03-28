using FluentNHibernate.Mapping;
using Ornament.Files.IO;

namespace Ornament.Files.Dao.Mapping
{
    public class FileFormatMapping : ClassMap<FileFormatSetting>
    {
        public FileFormatMapping()
        {
            this.Table("Files_FileFormat");
            this.Id(s => s.Id).GeneratedBy.Increment();
            this.Map(s => s.SettingType);
            this.Map(s => s.SkipRow);
            this.Map(s => s.Name);
            this.References(s => s.SampleFile);
            this.HasMany(s => s.Settings).Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
        }
    }
}