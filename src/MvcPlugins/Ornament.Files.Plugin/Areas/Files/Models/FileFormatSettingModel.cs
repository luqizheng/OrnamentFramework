using System;
using System.Collections.Generic;
using Ornament.Files.Dao;
using Ornament.Files.FieldSettings;

namespace Ornament.Files.Plugin.Areas.Files.Models
{
    public class FileFormatSettingModel
    {
        public FileFormatSettingModel()
        {
        }

        public FileFormatSettingModel(FileFormatSetting setting)
        {
            Name = setting.Name;
            Id = setting.Id;
            SampleFile = setting.SampleFile;
            SkipRow = setting.SkipRow;
            Settings = setting.Settings;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public FileRecord SampleFile { get; set; }

        public int SkipRow { get; set; }

        public ImportSettingType SettingType { get; set; }

        public IList<FieldSetting> Settings { get; set; }

        public void Save(IFileDaoFactory daofaoctry)
        {
            if (daofaoctry == null) throw new ArgumentNullException("daofaoctry");
            FileFormatSetting setting = Id != 0
                ? daofaoctry.CreateFileFormatSettingDao().Get(Id)
                : new FileFormatSetting();
            setting.SettingType = SettingType;
            setting.SkipRow = setting.SkipRow;
            setting.Name = Name;
            setting.Settings.Clear();
            foreach (FieldSetting fieldSetting in Settings)
            {
                setting.Settings.Add(fieldSetting);
            }

            daofaoctry.CreateFileFormatSettingDao().SaveOrUpdate(setting);
        }
    }
}