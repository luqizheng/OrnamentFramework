using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Qi.Attendance.Dao
{
    public interface ICardDao : IDao<string,Card>
    {
        IList<Card> GetEmployeeCards(Employee employee);
    }
}