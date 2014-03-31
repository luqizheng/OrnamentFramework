using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Web.Mvc;

namespace Ornament.Files.Dao
{
    public class FileRecordDao : Qi.Domain.NHibernates.DaoBase<string, FileRecord>, IFileDao
    {
        private IProjection PropertyName
        {
            get { return Projections.Property<FileRecord>(s => s.Name); }
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
    }
}