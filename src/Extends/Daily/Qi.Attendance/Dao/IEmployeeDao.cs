using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Qi.Attendance.Dao
{
    public interface IEmployeeDao : IDao<Guid, Employee>
    {
        Employee GetEmployee(string terminalId,string cardNumber);
        IList<Employee> FindByExample(int pageIndex, int pageSize, Employee example);
    }
}
