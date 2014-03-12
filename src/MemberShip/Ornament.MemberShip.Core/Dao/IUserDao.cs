using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public enum SortTag
    {
        Asc,
        Desc
    }

    public class SortTarget
    {
        public SortTag Tag { get; set; }
        public Expression<Func<object>> Property { get; set; }
    }

    public enum JunctionType
    {
        Or,
        And,
    }
    public class UserSearch
    {
        public JunctionType Junction { get; set; }
        public Org Org { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Phone { get; set; }
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
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="userSearch"></param>
        /// <returns></returns>
        IList<User> Search(int pageIndex, int pageSize, out int total, UserSearch userSearch);

        /// <summary>
        /// </summary>
        /// <param name="userSearch"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="sortTargets"></param>
        /// <returns></returns>
        IList<User> Search(UserSearch userSearch, int pageIndex, int pageSize, out int total, params SortTarget[] sortTargets);

   

        /// <summary>
        /// </summary>
        /// <param name="loginIds"></param>
        /// <returns></returns>
        IList<User> GetUsers(string[] loginIds);

        /// <summary>
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        IList<User> GetUsersByIds(string[] ids);

        /// <summary>
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        IList<User> GetUsersInRole(string roleId);

        /// <summary>
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="loginMatch"></param>
        /// <returns></returns>
        IList<User> FindUsersInRole(string roleId, string loginMatch);

        /// <summary>
        ///     /
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        User GetUserByEmail(string email);

        /// <summary>
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        int GetActivityDateNumber(DateTime time);

        /// <summary>
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

 

    
        /// <summary>
        /// </summary>
        /// <param name="userGroup"></param>
        /// <returns></returns>
        IList<User> GetUsers(UserGroup userGroup);

        /// <summary>
        /// </summary>
        /// <param name="org"></param>
        /// <returns></returns>
        IList<User> GetUsers(Org org);

     

        /// <summary>
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="userIdForExclude"></param>
        /// <returns></returns>
        int Count(string loginId, string userIdForExclude);

        /// <summary>
        /// </summary>
        /// <param name="email"></param>
        /// <param name="idForExclude"></param>
        /// <returns></returns>
        int CountByEmail(string email, string idForExclude);

        /// <summary>
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        IDictionary<DateTime, int> CountNewUser(DateTime start, DateTime end);

        /// <summary>
        /// </summary>
        /// <param name="now"></param>
        /// <returns></returns>
        IList<string> GetOnlineUsers(DateTime now);
    }
}