using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Files.Dao
{
    public class FileRecordDao : DaoBase<string, FileRecord>, IFileDao
    {
        private static IProjection PropertyName
        {
            get { return Projections.Property<FileRecord>(s => s.Name); }
        }

        private static IProjection PropertySignCode
        {
            get { return Projections.Property<FileRecord>(s => s.SignCode); }
        }

        public IList<FileRecord> Find(string name, int pageIndex, int pageSize, out int total)
        {
            DetachedCriteria countCritrer = CreateDetachedCriteria().SetProjection(Projections.RowCount());
            DetachedCriteria searchCriter =
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize);

            if (!String.IsNullOrEmpty(name))
            {
                if (!name.Contains("%"))
                {
                    name = "%" + name + "%";
                }
                searchCriter.Add(Restrictions.Like(PropertyName, name));
                countCritrer.Add(Restrictions.Like(PropertyName, name));
            }
            total = countCritrer.GetExecutableCriteria(CurrentSession).UniqueResult<int>();
            return searchCriter.GetExecutableCriteria(CurrentSession).List<FileRecord>();
        }

        public bool IsExist(string signCode)
        {
            DetachedCriteria cr = CreateDetachedCriteria().SetProjection(Projections.RowCount())
                .Add(Restrictions.Eq(PropertySignCode, signCode));
            return cr.GetExecutableCriteria(CurrentSession).UniqueResult<int>() > 0;
        }
    }
}