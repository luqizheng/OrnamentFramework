using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Qi.Attendance.Dao.NhImple
{
    public class CardDao :  DaoBase<string, Card>, ICardDao
    {
        public IList<Card> GetEmployeeCards(Employee employee)
        {
            return CreateDetachedCriteria().Add(Restrictions.Eq(Projections.Property<Card>(m => m.Employee), employee))
                .GetExecutableCriteria(this.CurrentSession).List<Card>();
        }
    }
}