using System;
using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    
    public enum SortTag
    {
        Asc,Desc
    }
    public class SortTarget
    {
        public SortTag Tag { get; set; }
        public string Name { get; set; }
    }
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
        /// Get all the number of the Db
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
        IList<User> QuickSearchOffset(string name, string loginid, string email, string phone, int startRecord, int recordLength, out int total,params SortTarget[] sortTargets);

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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        int GetActivityDateNumber(DateTime time);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="matchLoginId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchProperty"></param>
        /// <param name="searchValue"></param>
        /// <param name="isSortAsc"></param>
        /// <param name="sortProperty"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<User> Search(string searchProperty, string searchValue, bool isSortAsc, string sortProperty, int pageIndex,
                           int pageSize, out int total);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userGroup"></param>
        /// <returns></returns>
        IList<User> GetUsers(UserGroup userGroup);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="org"></param>
        /// <returns></returns>
        IList<User> GetUsers(Org org);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="userIdForExclude"></param>
        /// <returns></returns>
        int Count(string loginId, string userIdForExclude);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="idForExclude"></param>
        /// <returns></returns>
        int CountByEmail(string email, string idForExclude);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        IDictionary<DateTime, int> CountNewUser(DateTime start, DateTime end);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="now"></param>
        /// <returns></returns>
        IList<string> GetOnlineUsers(DateTime now);
    }
}