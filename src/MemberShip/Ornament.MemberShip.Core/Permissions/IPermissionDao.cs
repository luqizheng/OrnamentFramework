using System;
using System.Collections.Generic;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    ///     Permission for
    /// </summary>
    public interface IPermissionDao : IDao<string, Permission>
    {
        IQueryable<Permission> Permissions { get; }

        /// <summary>
        ///     Gets all resource's permissions which belong to user.
        /// </summary>
        /// <param name="loginid">logind of user</param>
        /// <param name="resource">资源是一个DomainObject</param>
        /// <returns></returns>
        IList<Permission> GetUserPermissions(string loginid, object resource);

        /// <summary>
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="resourceType"></param>
        /// <returns></returns>
        IList<Permission> GetUserPermissions(string loginId, Type resourceType);

        /// <summary>
        ///     Gets all permission belong to loginid
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        IList<Permission> GetPermissionByLoginId(string loginid);

        /// <summary>
        /// </summary>
        /// <param name="permissionName"></param>
        /// <returns></returns>
        Permission GetPermission(string permissionName);
    }
}