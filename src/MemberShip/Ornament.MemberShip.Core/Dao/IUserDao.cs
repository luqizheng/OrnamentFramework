using System;
using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserDao : IDao<string, User>
    {
        IQueryable<User> Users { get; }
        User GetByLoginId(string loginId);
        int Count();
        IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex, int pageSize);

        IList<User> GetUsers(string[] loginIds);

        IList<User> GetUsersByIds(string[] ids);

        IList<User> GetUsersInRole(string roleId);

        IList<User> FindUsersInRole(string roleId, string loginMatch);

        User GetUserByEmail(string email);

        int GetActivityDateNumber(DateTime time);

        IList<User> FindUsersByLoginId(string matchLoginId, int pageIndex, int pageSize);

        /// <summary>
        /// </summary>
        /// <param name="emailToMatch"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        IList<User> FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize);

        IList<User> Search(string loginId, string email, string phone, bool? islockout, bool? isApproved, int? startRow,
                           int? pageSize);

        IList<User> Search(string searchProperty, string searchValue, bool isSortAsc, string sortProperty, int pageIndex,
                           int pageSize, out int total);


        IList<User> GetUsers(UserGroup userGroup);

        IList<User> GetUsers(Org org);

            IList<User> FindAll(int pageIndex, int pageSize);
    }
}