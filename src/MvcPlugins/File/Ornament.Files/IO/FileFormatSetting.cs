using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Files.IO
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

        public virtual string Name { get; set; }
    }

    public class FieldSetting : DomainObject<FieldSetting, int>
    {
        public virtual string Name { get; set; }

        public virtual void SetValueTo(Func<string, object> method, string value)
        {
            method.Invoke(value ?? String.Empty);
        }
    }

    public class CloumnFieldSetting : FieldSetting
    {
        public virtual int Index { get; set; }
    }

    public class FixLengthFieldSetting : FieldSetting
    {
        public virtual int Start { get; set; }
        public virtual int Length { get; set; }
    }
}