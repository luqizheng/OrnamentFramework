using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IRoleDao : IDao<string, Role>
    {
        IQueryable<Role> Roles { get; }

        /// <summary>
        ///     根据角色Id获取角色
        /// </summary>
        /// <param name="roleIds">角色id数组</param>
        /// <returns>角色对象集合</returns>
        /// <remarks>
        ///     如果没有匹配的集合，返回Count为0的集合
        /// </remarks>
        ReadOnlyCollection<Role> GetRolesByName(string[] roleIds);

        IEnumerable<Role> GetRolesByIds(string[] ids);

        /// <summary>
        ///     在<see cref="roleIds" />中找到没有使用的role,被使用的role会存放在inUseRole中
        /// </summary>
        /// <param name="roleIds"></param>
        /// <param name="unuseRoles"></param>
        /// <returns></returns>
        IList<Role> GetInUseRoles(string[] roleIds, out string[] unuseRoles);

        /// <summary>
        ///     检查是否存在相同的名称
        /// </summary>
        /// <param name="name"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        int Count(string name, string id);

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        bool IsUsesInRole(string roleName);


        /// <summary>
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        ReadOnlyCollection<Role> GetRolesByName(string loginId);


        Role GetByName(string roleName);

        /// <summary>
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="currentPage">start 0</param>
        /// <returns></returns>
        IList<Role> Find(int pageSize, int currentPage);

        IList<Role> Find(string roleName, int pageIndex, int pageSize);
    }
}