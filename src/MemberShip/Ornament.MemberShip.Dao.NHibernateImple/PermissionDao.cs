using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip.Permissions;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    public class PermissionDao : DaoBase<string, Permission>, IPermissionDao
    {
        private readonly ObjectInitialization _pools = new ObjectInitialization();


        private IProjection NameProperty
        {
            get { return _pools.Once(() => Projections.Property<Permission>(s => s.Name)); }
        }

        private IProjection ResourceProperty
        {
            get { return _pools.Once(() => Projections.Property<Permission>(s => s.Resource)); }
        }

        private IProjection UserLoginidProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(s => s.LoginId)); }
        }

        private IProjection UserOrgProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(s => s.Org)); }
        }

        #region IPermissionDao Members

        public IList<Permission> GetUserPermissions(string loginId, Type resourceType)
        {
            throw new NotImplementedException();
        }


        public IList<Permission> GetPermissionByLoginId(string loginid)
        {
            DetachedCriteria user =
                DetachedCriteria.For(typeof (User)).Add(Restrictions.Eq(UserLoginidProperty, loginid))
                    .SetProjection(null)
                    .CreateCriteria("Roles")
                    .CreateCriteria("Permissions", "permission")
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));

            DetachedCriteria permission =
                DetachedCriteria.For(typeof (Permission)).Add(Property.ForName("Id").In(user));
            return permission.GetExecutableCriteria(CurrentSession).List<Permission>();
        }

        public IList<Permission> GetUserPermissions(string loginid, object resourceObject)
        {
            DetachedCriteria user =
                GetUserPermissions(loginid).SetProjection(Projections.Property("permission.Id"));
            ;

            DetachedCriteria ug =
                GetUserGroupPermisssions(loginid)
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));
            ;

            DetachedCriteria org =
                GetUserOrgPermissions(loginid)
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));
            ;


            Type permissionInsType = Permission.CreatePermission(resourceObject).GetType();

            DetachedCriteria permission = DetachedCriteria.For(permissionInsType)
                .Add(Restrictions.Eq(ResourceProperty, resourceObject))
                .Add(Restrictions.Disjunction()
                    .Add(Subqueries.PropertyIn("Id", org))
                    .Add(Subqueries.PropertyIn("Id", user))
                    .Add(Subqueries.PropertyIn("Id", ug))
                );

            return permission.SetCacheMode(CacheMode.Normal).SetCacheable(true)
                .GetExecutableCriteria(CurrentSession).List<Permission>();
        }

        public Permission GetPermission(string permissionName)
        {
            DetachedCriteria a = DetachedCriteria.For<Permission>().Add(Restrictions.Eq(NameProperty, permissionName));
            return a.GetExecutableCriteria(CurrentSession).UniqueResult<Permission>();
        }

        public IQueryable<Permission> Permissions
        {
            get { return CurrentSession.Query<Permission>(); }
        }

        #endregion

        /// <summary>
        ///     Criteria Path is Org/role/permission
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        public DetachedCriteria GetUserOrgPermissions(string loginid)
        {
            return DetachedCriteria.For<User>().Add(Restrictions.Eq(UserLoginidProperty, loginid))
                .CreateCriteria("Org", "org")
                .CreateCriteria("org.Roles", "role")
                .CreateCriteria("Permissions", "permission");
        }

        /// <summary>
        ///     Criteria Path is Org/role/permission
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        public DetachedCriteria GetUserGroupPermisssions(string loginid)
        {
            return DetachedCriteria.For<User>().Add(Restrictions.Eq(UserLoginidProperty, loginid))
                .CreateCriteria("UserGroups", "ug")
                .CreateCriteria("ug.Roles", "role")
                .CreateCriteria("Permissions", "permission");
        }

        /// <summary>
        ///     Get Permission from role belong to user
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        public DetachedCriteria GetUserPermissions(string loginid)
        {
            return DetachedCriteria.For(typeof (User)).Add(Restrictions.Eq(UserLoginidProperty, loginid))
                .CreateCriteria("Roles")
                .CreateCriteria("Permissions", "permission");
        }
    }
}