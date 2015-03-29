using NHibernate.Criterion;
using Ornament.Files.FieldSettings;
using Qi.Domain.NHibernates;

namespace Ornament.Files.Dao
{
    public class FileFormatSettingDao : DaoBase<int, FileFormatSetting>, IFileFormatSettingDao
    {
        public static IProjection NameProperty
        {
            get { return Projections.Property<FileFormatSetting>(s => s.Name); }
        }

        public FileFormatSetting GetByName(string name)
        {
            return CreateDetachedCriteria().Add(Restrictions.Eq(NameProperty, name).IgnoreCase())
                .GetExecutableCriteria(CurrentSession).UniqueResult<FileFormatSetting>();
        }

        public bool IsExist(string name, string excludeId)
        {
            DetachedCriteria criteria =
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(NameProperty, name).IgnoreCase())
                    .SetProjection(Projections.RowCount());
            if (excludeId != null)
                criteria = criteria.Add(Restrictions.Not(Restrictions.Eq(Projections.Id(), excludeId)));

            return criteria.GetExecutableCriteria(CurrentSession).UniqueResult<int>() != 0;
        }
    }
}