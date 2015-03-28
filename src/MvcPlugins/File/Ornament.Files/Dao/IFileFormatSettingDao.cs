using Ornament.Files.IO;
using Qi.Domain;

namespace Ornament.Files.Dao
{
    public interface IFileFormatSettingDao
        : IDao<int, FileFormatSetting>
    {
        FileFormatSetting GetByName(string name);

        bool IsExist(string name, string excludeId);
    }
}