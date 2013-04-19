using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    /// <summary>
    /// </summary>
    public interface IUserGroupDao : IDao<string, UserGroup>
    {
        IQueryable<UserGroup> UserGroups { get; }


        /// <summary>
        ///     根据UserId,获取包含该userId的用户组
        /// </summary>
        /// <param name="userLoginId"></param>
        /// <returns></returns>
        ReadOnlyCollection<UserGroup> GetUserGroupByUser(string userLoginId);

        /// <summary>
        ///     获取loginId没有的用户组
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        ReadOnlyCollection<UserGroup> GetUnuseGroup(string loginId);

        /// <summary>
        /// </summary>
        /// <param name="guids"></param>
        /// <returns></returns>
        IList<UserGroup> GetUserGroups(string[] guids);

        /// <summary>
        /// </summary>
        /// <param name="ids"></param>
        void Delete(string[] ids);

        UserGroup GetByName(string groupName);
        IList<UserGroup> FindAll(int pageIndex, int pageSize);
    }
}