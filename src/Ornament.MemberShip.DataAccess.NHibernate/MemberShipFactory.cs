using System.Linq;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class MemberShipFactory : IMemberShipFactory
    {
        #region IMemberShipFactory Members

        public IQueryable<ProfileValue> Profiles
        {
            get { return CreateProfileDao().Profiles; }
        }

        public IQueryable<UserSecretToken> UserSecretTokens { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IUserDao CreateUserDao()
        {
            return new UserDao();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IUserGroupDao CreateUserGroupDao()
        {
            return new UserGroupDao();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IOrgDao CreateOrgDao()
        {
            return new OrgDao();
        }

        public IUserSecretTokenDao CreateUserSecortTokeDao()
        {
            return new UserSecretTokenDao();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IRoleDao CreateRoleDao()
        {
            return new RoleDao();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IMemberDao CreateMemberDao()
        {
            return new MemberDao();
        }

        /// <summary>
        /// 
        /// </summary>
        public IQueryable<User> Users
        {
            get { return CreateUserDao().Users; }
        }

        /// <summary>
        /// 
        /// </summary>
        public IQueryable<Role> Roles
        {
            get { return CreateRoleDao().Roles; }
        }

        /// <summary>
        /// 
        /// </summary>
        public IQueryable<UserGroup> UserGroups
        {
            get { return CreateUserGroupDao().UserGroups; }
        }

        /// <summary>
        /// 
        /// </summary>
        public IQueryable<Permission> Permissions
        {
            get { return CreatePermissionDao().Permissions; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IPermissionDao CreatePermissionDao()
        {
            return new PermissionDao();
        }


        /// <summary>
        /// 
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