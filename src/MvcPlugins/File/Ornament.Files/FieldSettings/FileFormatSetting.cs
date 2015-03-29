using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Files.FieldSettings
{
    public enum ImportSettingType
    {
        Column,
        FixLength,
    }

    public class FileFormatSetting : DomainObject<FileFormatSetting, int>
    {
        private IList<FieldSetting> _settings;
        public virtual int SkipRow { get; set; }

        public virtual ImportSettingType SettingType { get; set; }

        public virtual IList<FieldSetting> Settings
        {
            get { return _settings ?? (_settings = new List<FieldSetting>()); }
        }

        public virtual FileRecord SampleFile { get; set; }
        public virtual string Name { get; set; }
    }
}