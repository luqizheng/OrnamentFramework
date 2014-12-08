using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Permissions;

namespace Ornament.Contexts
{
    public class MemberShipContext
    {
        private readonly IMemberShipDaoFactory _daoFactory;
        private string adminUserId;
        private string adminRoleId;
        public MemberShipContext(IMemberShipDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        public IMemberShipProvider MemberShipProvider { get; set; }
        public User UserAdmin
        {
            get
            {
                User admin;
                if (adminUserId == null)
                {
                    admin = _daoFactory.CreateUserDao().GetByLoginId("admin");
                    adminUserId = admin.Id;
                }
                else
                {
                    admin = _daoFactory.CreateUserDao().Get(adminUserId);
                    if (admin == null)
                    {
                        adminUserId = null;
                        return this.UserAdmin;
                    }
                }
                return admin;
            }
        }
        public Role RoleAdmin
        {
            get
            {
                Role role;
                if (adminRoleId == null)
                {
                    role = _daoFactory.CreateRoleDao().GetByName("admin");
                    adminRoleId = role.Id;
                }
                else
                {
                    role = _daoFactory.CreateRoleDao().Get(adminRoleId);
                    if (role == null)
                    {
                        adminRoleId = null;
                        return this.RoleAdmin;
                    }
                }
                return role;
            }
        }
        /// <summary>
        ///     检查当前用户是否有资源的操作权限
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="resType">资源类型</param>
        /// <param name="id">资源的Id</param>
        /// <param name="operator">操作</param>
        /// <returns>有操作权限返回true，否则返回false</returns>
        /// <exception cref="OrnamentException">通过资源Id，无法找到资源的时候，就会发出这个异常</exception>
        /// <remarks>
        /// </remarks>
        public bool HasRight(User currentUser, Type resType, string id, Enum @operator)
        {
            object res;
            try
            {
                res = _daoFactory.CreateResourceDao().Load(resType, id);
            }
            catch (Exception ex)
            {
                throw new OrnamentException(String.Format("Can't find the resource {0}, id={1}", resType.FullName, id),
                                            ex);
            }
            return HasRight(currentUser, res, @operator);
        }


        /// <summary>
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="resource"></param>
        /// <param name="operators"></param>
        /// <returns></returns>
        public bool HasRight(User currentUser, object resource, Enum operators)
        {
            if (resource == null)
                throw new ArgumentNullException("resource");
            if (currentUser == null)
                return false;
            if (Convert.ToInt32(operators) == 0)
                return false;
            if (currentUser.LoginId == User.AdminLoginId)
                return true;
            IPermissionDao permissionDao = _daoFactory.CreatePermissionDao();
            IList<Permission> permissions = permissionDao.GetUserPermissions(currentUser.LoginId, resource);
            return
                permissions.Any(permission => permission.Resource.Equals(resource) && permission.HasOperator(operators));
        }

        /// <summary>
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="resType"></param>
        /// <param name="id"></param>
        /// <param name="operator"></param>
        /// <returns></returns>
        public bool HasRight(User currentUser, Type resType, object id, Enum @operator)
        {
            if (currentUser.LoginId == User.AdminLoginId)
                return true;
            object res;
            try
            {
                res = _daoFactory.CreateResourceDao().Load(resType, id);
            }
            catch (Exception ex)
            {
                throw new OrnamentException(String.Format("Can't find the resource {0}, id={1}", resType.FullName, id),
                                            ex);
            }
            return HasRight(currentUser, res, @operator);
        }

        /// <summary>
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="resourceType"></param>
        /// <param name="operatorVal"></param>
        /// <returns></returns>
        public bool ExistPermission(User currentUser, Type resourceType, Enum operatorVal)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (operatorVal == null)
                throw new ArgumentNullException("operatorVal");
            if (currentUser == null)
                throw new MemberShipException("Please login.");
            if (currentUser.LoginId == User.AdminLoginId)
                return true;
            IPermissionDao permissionDao = _daoFactory.CreatePermissionDao();
            IList<Permission> permissions = permissionDao.GetUserPermissions(currentUser.LoginId, resourceType);
            return permissions.Any(permission => permission.Resource.Equals(resourceType)
                                                 && permission.HasOperator(operatorVal));
        }
    }
}