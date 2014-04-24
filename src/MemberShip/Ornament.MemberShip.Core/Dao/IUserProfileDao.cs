using System;
using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserProfileDao : IDao<string, ProfileValue>
    {
        IQueryable<ProfileValue> Profiles { get; }
        int Delete(string[] userName);
        int DeleteAnonymous(DateTime userInactiveSinceDate);
        int DeleteAuthenticated(DateTime userInactiveSinceDate);
        int Delete(DateTime userInactiveSinceDate);
        int CountAnonymous(DateTime userInactiveSinceDate);
        int CountAuthenticated(DateTime userInactiveSinceDate);
        int Count(DateTime userInactiveSinceDate);
        IList<ProfileValue> GetAllAnonymous(int pageIndex, int pageSize, out int totalRecords);
        IList<ProfileValue> GetAllAuthenticated(int pageIndex, int pageSize, out int totalRecords);
        IList<ProfileValue> GetAll(int pageIndex, int pageSize, out int totalRecords);

        ProfileValue FindByLoginId(string loginId);
    }
}