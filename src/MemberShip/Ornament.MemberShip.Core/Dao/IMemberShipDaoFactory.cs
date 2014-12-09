using System.Linq;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Dao
{
    public interface IMemberShipDaoFactory
    {
        IQueryable<User> Users { get; }

        /// <summary>
        /// </summary>
        IQueryable<Role> Roles { get; }

        /// <summary>
        /// </summary>
        IQueryable<UserGroup> UserGroups { get; }


        IQueryable<Permission> Permissions { get; }

        IQueryable<ProfileValue> Profiles { get; }

        IQueryable<EmailVerifier> UserSecretTokens { get; }




        /// <summary>
        /// </summary>
        IUserDao CreateUserDao();


        /// <summary>
        /// </summary>
        IUserGroupDao CreateUserGroupDao();

        /// <summary>
        /// </summary>
        /// <returns></returns>
        IOrgDao CreateOrgDao();

        IUserSecurityTokenDao CreateEmailVerifierDao();

        /// <summary>
        /// </summary>
        /// <returns></returns>
        IRoleDao CreateRoleDao();

        /// <summary>
        /// </summary>
        /// <returns></returns>
        IPerformerDao CreateMemberDao();

        /// <summary>
        /// </summary>
        /// <returns></returns>
        IPermissionDao CreatePermissionDao();


        /// <summary>
        /// </summary>
        /// <returns></returns>
        IResourceDao CreateResourceDao();

        IUserProfileDao CreateProfileDao();

        IUserStatisticsDao CreateStatisticsDao();
    }
}