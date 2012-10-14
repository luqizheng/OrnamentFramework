using System.Linq;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao
{
    public interface IMemberShipFactory
    {
        IQueryable<User> Users { get; }

        /// <summary>
        /// 
        /// </summary>
        IQueryable<Role> Roles { get; }

        /// <summary>
        /// 
        /// </summary>
        IQueryable<UserGroup> UserGroups { get; }


        IQueryable<Permission> Permissions { get; }

        IQueryable<ProfileValue> Profiles { get; }


        /// <summary>
        /// 
        /// </summary>
        IUserDao CreateUserDao();


        /// <summary>
        /// 
        /// </summary>
        IUserGroupDao CreateUserGroupDao();

        IOrgDao CreateOrgDao();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IRoleDao CreateRoleDao();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IMemberDao CreateMemberDao();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IPermissionDao CreatePermissionDao();


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IResourceDao CreateResourceDao();

        IUserProfileDao CreateProfileDao();
    }
}