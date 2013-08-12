using System.Linq;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class MemberShipFactory : IMemberShipFactory
    {
        #region IMemberShipFactory Members

        public IQueryable<ProfileValue> Profiles
        {
            get { return CreateProfileDao().Profiles; }
        }

        public IQueryable<UserSecretToken> UserSecretTokens { get { return CreateUserSecurityTokenDao().Tokens; } }

      
        public IFriendGroupDao CreateFriendGroupDao()
        {
            return new FriendGroupDao();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IUserDao CreateUserDao()
        {
            return new UserDao();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IUserGroupDao CreateUserGroupDao()
        {
            return new UserGroupDao();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IOrgDao CreateOrgDao()
        {
            return new OrgDao();
        }

        public IUserSecurityTokenDao CreateUserSecurityTokenDao()
        {
            return new UserSecurityTokenDao();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IRoleDao CreateRoleDao()
        {
            return new RoleDao();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IPerformerDao CreateMemberDao()
        {
            return new PerformerDao();
        }

        /// <summary>
        /// </summary>
        public IQueryable<User> Users
        {
            get { return CreateUserDao().Users; }
        }

        /// <summary>
        /// </summary>
        public IQueryable<Role> Roles
        {
            get { return CreateRoleDao().Roles; }
        }

        /// <summary>
        /// </summary>
        public IQueryable<UserGroup> UserGroups
        {
            get { return CreateUserGroupDao().UserGroups; }
        }

        /// <summary>
        /// </summary>
        public IQueryable<Permission> Permissions
        {
            get { return CreatePermissionDao().Permissions; }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IPermissionDao CreatePermissionDao()
        {
            return new PermissionDao();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IResourceDao CreateResourceDao()
        {
            return new ResourceDao();
        }

        public IUserProfileDao CreateProfileDao()
        {
            return new ProfileDao();
        }

        #endregion
    }
}