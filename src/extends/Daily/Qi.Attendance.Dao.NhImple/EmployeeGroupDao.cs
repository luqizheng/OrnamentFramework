using System;
using Qi.Domain.NHibernates;

namespace Qi.Attendance.Dao.NhImple
{
    public class EmployeeGroupDao:DaoBase<Guid,EmployeeGroup>,IEmployeeGroupDao
    {}
}