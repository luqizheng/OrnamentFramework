using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Web.Mvc;

namespace Ornament.Files.Dao
{
    public class FileRecordDao : Qi.Domain.NHibernates.DaoBase<string, FileRecord>, IFileDao
    {
        static private IProjection PropertyName
        {
            get { return Projections.Property<FileRecord>(s => s.Name); }
        }

        static private IProjection PropertySignCode
        {
            get { return Projections.Property<FileRecord>(s => s.SignCode); }
        }

        public IList<FileRecord> Find(string name, int pageIndex, int pageSize, out int total)
        {
            var countCritrer = CreateDetachedCriteria().SetProjection(Projections.RowCount());
            var searchCriter = CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize);

            if (!String.IsNullOrEmpty(name))
            {
                if (!name.Contains("%"))
                {
                    name = "%" + name + "%";
                }
                searchCriter.Add(Restrictions.Like(PropertyName, name));
                countCritrer.Add(Restrictions.Like(PropertyName, name));
            }
            total = countCritrer.GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
            return searchCriter.GetExecutableCriteria(this.CurrentSession).List<FileRecord>();

        }

        public bool IsExist(string signCode)
        {
            var cr = CreateDetachedCriteria().SetProjection(Projections.RowCount())
                .Add(Restrictions.Eq(PropertySignCode, signCode));
            return cr.GetExecutableCriteria(this.CurrentSession).UniqueResult<int>() > 0;
        }
    }
}