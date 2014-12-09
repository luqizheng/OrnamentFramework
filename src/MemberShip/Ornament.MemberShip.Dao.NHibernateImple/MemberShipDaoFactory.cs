using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class MemberShipDaoFactory:IMemberShipDaoFactory
    {
        public IQueryable<User> Users
        {
            get { return this.CreateUserDao().Users; }
        }

        public IQueryable<Role> Roles
        {
            get { return CreateRoleDao().Roles; }
        }

        public IQueryable<UserGroup> UserGroups
        {
            get { return CreateUserGroupDao().UserGroups; }
        }

        public IQueryable<Permission> Permissions
        {
            get { return CreatePermissionDao().Permissions; }
        }

        public IQueryable<ProfileValue> Profiles
        {
            get { return CreateProfileDao().Profiles; }
        }

        public IQueryable<EmailVerifier> UserSecretTokens
        {
            get { return CreateEmailVerifierDao().Tokens; }
            
        }
     
        public IUserDao CreateUserDao()
        {
            return new UserDao();
        }

        public IUserGroupDao CreateUserGroupDao()
        {
            return new UserGroupDao();
            
        }

        public IOrgDao CreateOrgDao()
        {
            return new OrgDao();
        }

        public IUserSecurityTokenDao CreateEmailVerifierDao()
        {
            return new EmailVerifierDao();
        }

        public IRoleDao CreateRoleDao()
        {
            return new RoleDao();
        }

        public IPerformerDao CreateMemberDao()
        {
            return new PerformerDao();
        }

        public IPermissionDao CreatePermissionDao()
        {
            return new PermissionDao();
        }

        public IResourceDao CreateResourceDao()
        {
            return new ResourceDao();
        }

        public IUserProfileDao CreateProfileDao()
        {
            return new ProfileDao();
        }

        public IUserStatisticsDao CreateStatisticsDao()
        {
            return new StatisticsDao();
        }
    }
}
