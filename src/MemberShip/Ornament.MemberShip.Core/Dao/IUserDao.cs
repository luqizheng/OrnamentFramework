using System;
using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserDao : IDao<string, User>
    {
        /// <summary>
        ///     For Linq
        /// </summary>
        IQueryable<User> Users { get; }

        /// <summary>
        ///     Get User by LoginId
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">LoginId is null or empty</exception>
        User GetByLoginId(string loginId);

        /// <summary>
        /// </summary>
        /// <returns></returns>
        int Count();

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        /// <param name="loginid"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex, int pageSize, out int total);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="loginid"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="startRecord"></param>
        /// <param name="recordLength"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<User> QuickSearchOffset(string name, string loginid, string email, string phone, int startRecord, int recordLength, out int total);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="loginid"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex, int pageSize);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginIds"></param>
        /// <returns></returns>
        IList<User> GetUsers(string[] loginIds);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        IList<User> GetUsersByIds(string[] ids);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        IList<User> GetUsersInRole(string roleId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="loginMatch"></param>
        /// <returns></returns>
        IList<User> FindUsersInRole(string roleId, string loginMatch);
        /// <summary>
        /// /
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="length"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentOutOfRangeException">length should be larger than 0</exception>
        IList<User> FindAllOffset(int start, int length,out int total);
        int Count(string loginId, string userIdForExclude);

        int CountByEmail(string email, string idForExclude);

        IDictionary<DateTime, int> CountNewUser(DateTime start, DateTime end);

        IList<string> GetOnlineUsers(DateTime now);
    }
}