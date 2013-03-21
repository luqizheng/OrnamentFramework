using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Qi.Domain;

namespace Qi.Attendance.Dao
{
    public interface ICheckHistoryDao : IDao<string, CheckHistory>
    {
        IList<CheckHistory> GetList(DateTime dateTime, EmployeeGroup employeeGroup);
        IList<CheckHistory> GetList(EmployeeGroup employee, DateTime start, DateTime end);
    }
}
