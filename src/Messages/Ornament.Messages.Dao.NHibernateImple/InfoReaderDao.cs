using System;
using System.Collections.Generic;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class InfoReaderDao : DaoBase<string, MessageReader>, IInfoReaderDao
    {
        public IList<MessageReader> FindAll(int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize).GetExecutableCriteria(
                CurrentSession).List<MessageReader>();
        }
    }
}