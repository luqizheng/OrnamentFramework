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
    public sealed class UserSecretTokenDao:DaoBase<string,UserSecretToken>,IUserSecretTokenDao
    {
        
    }
    public sealed class RoleDao : DaoBase<string, Role>, IRoleDao
    {
        #region IRoleDao Members

        public IQueryable<Role> Roles
        {
            get { return CurrentSession.Query<Role>(); }
        }

        /// <summary>
        /// Gets Roles by names
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public ReadOnlyCollection<Role> GetRoles(string[] roleName)
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

        public ReadOnlyCollection<Role> GetRoles(Guid[] roleIds)
        {
            if (roleIds == null || roleIds.Length == 0)
                return new ReadOnlyCollection<Role>(new List<Role>());

            IList<Role> result = CreateDetachedCriteria()
                .Add(Restrictions.In(Projections.Property<Role>(s => s.Id), roleIds)).GetExecutableCriteria(
                    CurrentSession).List<Role>();
            return new ReadOnlyCollection<Role>(result);
        }

        public IList<Role> GetInUseRoles(string[] roleIds, out string[] unuseRoles)
        {
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

        public bool IsUsesInRole(string roleName)
        {
            IQuery query =
                CreateQuery(
                    "select count(*) from Role r where r.Name =? and  r in (select elements(u.Roles) from User u)");
            query.SetString(0, roleName);
            return Convert.ToInt32(query.UniqueResult()) > 0;
        }


        public ReadOnlyCollection<Role> GetRoles(string loginId)
        {
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
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq("Name", roleName)).GetExecutableCriteria(CurrentSession).SetCacheMode(
                        CacheMode.Normal).
                    UniqueResult<Role>();
        }

        public IList<Role> Find(int pageSize, int currentPage)
        {
            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageSize*currentPage).
                    GetExecutableCriteria(CurrentSession).List<Role>();
        }

        #endregion

        public void Delete(string[] roleName)
        {
            SimpleExpression ros = Restrictions.Eq("Name", roleName[0]);
            ICriterion icn = null;
            for (int i = 1; i < roleName.Length; i++)
            {
                icn = Restrictions.Or(ros, Restrictions.Eq("Name", roleName[1]));
            }
            foreach (string role in CreateCriteria().Add(icn).List<string>())
            {
                CurrentSession.Delete(role);
            }
        }
    }
}