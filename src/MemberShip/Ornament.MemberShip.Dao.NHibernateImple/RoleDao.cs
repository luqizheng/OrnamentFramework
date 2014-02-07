using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class RoleDao : DaoBase<string, Role>, IRoleDao
    {
        #region IRoleDao Members

        public IQueryable<Role> Roles
        {
            get { return CurrentSession.Query<Role>(); }
        }

        /// <summary>
        ///     Gets Roles by names
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public ReadOnlyCollection<Role> GetRolesByName(string[] roleName)
        {
            if (roleName == null || roleName.Length == 0)
                return new ReadOnlyCollection<Role>(new List<Role>());
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string a in roleName)
            {
                disJunction.Add(Restrictions.Eq(Projections.Property<Role>(s => s.Name), a));
            }
            IList<Role> result =
                CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<Role>();
            return new ReadOnlyCollection<Role>(result);
        }

        /// <summary>
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public IEnumerable<Role> GetRolesByIds(string[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new List<Role>();
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string a in ids)
            {
                disJunction.Add(Restrictions.Eq(Projections.Property<Role>(s => s.Id), a));
            }
            IList<Role> result =
                CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<Role>();
            return new ReadOnlyCollection<Role>(result);
        }


        public IList<Role> GetInUseRoles(string[] roleIds, out string[] unuseRoles)
        {
            if (roleIds == null) throw new ArgumentNullException("roleIds");
            string hql =
                String.Format(
                    "from Role r where r.Name in ('{0}') and  r in (select elements(u.Roles) from User u)",
                    String.Join("','", roleIds));

            Dictionary<string, Role> result = CreateQuery(hql).List<Role>().ToDictionary(role => role.Name);

            List<string> unuseRoleResult = roleIds.Where(role => !result.ContainsKey(role)).ToList();

            unuseRoles = new string[unuseRoleResult.Count];
            unuseRoleResult.CopyTo(unuseRoles);
            return new List<Role>(result.Values);
        }

        public int Count(string name, string id)
        {
            return
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .Add(Restrictions.Eq(NameProperty, name))
                    .Add(Restrictions.NotEqProperty(Projections.Id(), id)
                    ).GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public bool IsUsesInRole(string roleName)
        {
            IQuery query =
                CreateQuery(
                    "select count(*) from Role r where r.Name =? and  r in (select elements(u.Roles) from User u)");
            query.SetString(0, roleName);
            return Convert.ToInt32(query.UniqueResult()) > 0;
        }


        public ReadOnlyCollection<Role> GetRolesByName(string loginId)
        {
            if (loginId == null)
                throw new ArgumentNullException("loginId");
            const string foundOrgId = "Select u.Org.Id From User u where u.LoginId=?";
            IList guid = CurrentSession.CreateQuery(foundOrgId).SetString(0, loginId).List();


            string orgId = null;
            if (guid.Count != 0)
                orgId = guid[0] + "%";
            string hql =
                @"From Role r where r.Name in(select elements(u.Roles) From User u where u.LoginId=:LoginId)
                        or r.Name in 
                        (
                            Select elements(g.Roles) From UserGroup g where g.Id in 
                            (select elements(u1.UserGroups) from User u1 where u1.LoginId=:LoginId)
                         )";
            if (orgId != null)
                hql +=
                    @" or r.Name in(
                        select elements(o.Roles) from Org o where
                        o.OrderId like :orgId
                        )";
            IQuery query = CurrentSession.CreateQuery(hql);
            query.SetString("LoginId", loginId);
            if (orgId != null)
                query.SetString("orgId", orgId);

            return new ReadOnlyCollection<Role>(query.List<Role>());
        }

        public Role GetByName(string roleName)
        {
            return
                DetachedCriteria.For<Role>()
                    .Add(Restrictions.Eq("Name", roleName)).GetExecutableCriteria(CurrentSession).SetCacheMode(
                        CacheMode.Normal).
                     UniqueResult<Role>();
        }

        public IList<Role> Find(int pageSize, int currentPage)
        {
            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageSize * currentPage).
                                         GetExecutableCriteria(CurrentSession).List<Role>();
        }

        public IList<Role> Find(string roleName, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize)
                                           .Add(Restrictions.InsensitiveLike(NameProperty, roleName))
                                           .GetExecutableCriteria(CurrentSession).List<Role>();
        }

        public IList<Role> GetInUseRoles(string[] roleIds)
        {
            string[] unuseRoles;
            return GetInUseRoles(roleIds, out unuseRoles);
        }

        #endregion

        private IProjection NameProperty
        {
            get { return Projections.Property<Role>(s => s.Name); }
        }
    }
}