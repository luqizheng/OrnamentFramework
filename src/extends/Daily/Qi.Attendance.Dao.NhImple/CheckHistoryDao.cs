using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Attendance.Analizers;
using Qi.Domain.NHibernates;

namespace Qi.Attendance.Dao.NhImple
{
    public class CheckHistoryDao : DaoBase<string, CheckHistory>, ICheckHistoryDao
    {
        private IProjection SignTime
        {
            get { return Projections.Property<CheckHistory>(s => s.SignTime); }
        }

        private IProjection EmployeeGroup
        {
            get { return Projections.Property<Employee>(s => s.EmployeeGroup); }
        }

        public IList<CheckHistory> GetList(DateTime dateTime, EmployeeGroup employeeGroup)
        {
            return GetList(employeeGroup, dateTime, dateTime);
        }

        public IList<CheckHistory> GetList(EmployeeGroup employeeGroup, DateTime startTime, DateTime endTime)
        {
            var start = new DateTime(startTime.Year, startTime.Month, startTime.Day);
            var end = new DateTime(endTime.Year, endTime.Month, endTime.Day, 23, 59, 59);

            DetachedCriteria employeeGroupId = DetachedCriteria.For<Employee>()
                                                               .Add(Restrictions.Eq(EmployeeGroup, employeeGroup))
                                                               .SetProjection(Projections.Property<Employee>(s => s.Id));

            return CreateDetachedCriteria()
                .Add(Restrictions.Le(SignTime, end))
                .Add(Restrictions.Ge(SignTime, start))
                .Add(Subqueries.PropertyIn("Employee", employeeGroupId))
                .GetExecutableCriteria(CurrentSession)
                .List<CheckHistory>();
        }

     
    }
}