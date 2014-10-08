using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserStatisticsDao : IDao<int, UserStatistics>
    {
        UserStatistics Get(DateTime date);
        IList<UserStatistics> FindByDate(DateTime start, DateTime end);
    }
}