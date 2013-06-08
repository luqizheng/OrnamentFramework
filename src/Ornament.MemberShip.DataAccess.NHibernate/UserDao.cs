﻿using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Qi;
using Qi.Domain.NHibernates;
using Qi.NHibernateExtender;


namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class UserDao : DaoBase<string, User>, IUserDao
    {
        private readonly ObjectInitialization _pools = new ObjectInitialization();
        private IProjection _loginidProperty;

        private IProjection LoginProperty
        {
            get { return _loginidProperty ?? (_loginidProperty = Projections.Property<User>(s => s.LoginId)); }
        }

        private IProjection EmailProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Email)); }
        }

        private IProjection NameProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Name)); }
        }

        #region IUserDao Members

        public override IList<User> GetAll()
        {
            return CreateDetachedCriteria().GetExecutableCriteria(CurrentSession).List<User>();
        }

        public IQueryable<User> Users
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<User>(); }
        }

        public int Count()
        {
            return CreateDetachedCriteria().SetProjection(Projections.RowCount()).SetCacheMode(CacheMode.Normal)
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public IList<User> QuickSearch(string name, string loginid, string email, int pageIndex, int pageSize)
        {
            var result = CreateDetachedCriteria();
            var a = Restrictions.Disjunction();
            if (!string.IsNullOrEmpty(loginid))
                a.Add(Restrictions.InsensitiveLike(LoginProperty, loginid));
            if (!string.IsNullOrEmpty(email))
                a.Add(Restrictions.InsensitiveLike(EmailProperty, email));
            if (!string.IsNullOrEmpty(name))
                a.Add(Restrictions.InsensitiveLike(NameProperty, name));
            result.Add(a);
            return result.SetFirstResult(pageIndex * pageSize).SetMaxResults(pageSize).GetExecutableCriteria(this.CurrentSession).List<User>();
        }

        /// <summary>
        /// 获取用户
        /// </summary>
        /// <param name="loginIds">登录Id</param>
        /// <returns>用户对象集合</returns>
        public IList<User> GetUsers(string[] loginIds)
        {
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string loginid in loginIds)
            {
                disJunction.Add(Restrictions.Eq("LoginId", loginid).IgnoreCase());
            }

            return CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<User>();
        }

        /// <summary>
        /// 根据角色Id获取用户
        /// </summary>
        /// <param name="roleId">角色Id</param>
        /// <returns></returns>
        public IList<User> GetUsersInRole(string roleId)
        {
            return CreateDetachedCriteria()
                .CreateCriteria("Roles")
                .Add(Restrictions.Eq("Name", roleId).IgnoreCase())
                .GetExecutableCriteria(CurrentSession).List<User>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleName"></param>
        /// <param name="loginMatch">模糊查询 支持 %</param>
        /// <returns></returns>
        public IList<User> FindUsersInRole(string roleName, string loginMatch)
        {
            return CreateCriteria()
                .Add(Restrictions.InsensitiveLike("LoginId", loginMatch))
                .CreateCriteria("Roles")
                .Add(Restrictions.Eq("Name", roleName))
                .List<User>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public User GetUserByEmail(string email)
        {
            return CreateCriteria().Add(Restrictions.Eq(EmailProperty, email)).UniqueResult<User>();
        }

        /// <summary>
        /// 获取在某日期之后处于活动状态的用户
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public int GetActivityDateNumber(DateTime time)
        {
            return Count(Restrictions.Le("LastActivityDate", time));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="matchLoginId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<User> FindUsersByLoginId(string matchLoginId, int pageIndex, int pageSize)
        {
            DetachedCriteria ica = CreateDetachedCriteria();
            if (!String.IsNullOrEmpty(matchLoginId))
            {
                ica.Add(Restrictions.InsensitiveLike(LoginProperty, matchLoginId + "%"));
            }

            return
                ica.SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize).GetExecutableCriteria(CurrentSession)
                    .List<User>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emailToMatch"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<User> FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.InsensitiveLike(EmailProperty, emailToMatch))
                .SetMaxResults(pageSize)
                .SetFirstResult(pageSize * pageIndex)
                .GetExecutableCriteria(CurrentSession).List<User>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="islockout"></param>
        /// <param name="isApproved"></param>
        /// <param name="startRow"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<User> Search(string loginId, string email, string phone, bool? islockout, bool? isApproved, int? startRow, int? pageSize)
        {
            ICriterion tion = CreateSearchCondition(loginId, email, phone, islockout, isApproved);

            return CreateDetachedCriteria()
                .Add(tion)
                .SetMaxResults(pageSize ?? 40)
                .SetFirstResult(startRow ?? 0)
                .GetExecutableCriteria(CurrentSession).List<User>();
            ;
        }

        public IList<User> Search(string searchProperty, string searchValue, bool isSortAsc, string sortProperty,
                                  int pageIndex, int pageSize, out int total)
        {
            SimpleExpression creator = Restrictions.Eq(searchProperty, searchValue);
            total = Count(creator);
            if (!String.IsNullOrEmpty(sortProperty))
                sortProperty = "LoginId";
            var order = new Order(sortProperty, isSortAsc);
            return
                CreateDetachedCriteria().Add(creator).AddOrder(order).SetFirstResult(pageIndex * pageSize).SetMaxResults(
                    pageSize)
                    .GetExecutableCriteria(CurrentSession)
                    .List<User>();
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="islockout"></param>
        /// <param name="isApproved"></param>
        /// <returns></returns>
        public int Count(string loginId, string email, string phone, bool islockout, bool isApproved)
        {
            ICriterion tion = CreateSearchCondition(loginId, email, phone, islockout, isApproved);

            ICriteria ica = CreateCriteria();
            ica.Add(tion);
            ica.SetProjection(Projections.Count(LoginProperty));
            return ica.UniqueResult<int>();
        }


        public User GetByLoginId(string loginId)
        {
            DetachedCriteria cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(LoginProperty, loginId).IgnoreCase())
                .SetCacheMode(CacheMode.Normal)
                .SetCacheable(true);
            return cri.GetExecutableCriteria(CurrentSession).UniqueResult<User>();
        }


        public IList<User> GetUsers(UserGroup userGroup)
        {
            return CreateDetachedCriteria()
                .CreateCriteria("UserGroups")
                .Add(Restrictions.Eq("Id", userGroup.Id)).GetExecutableCriteria(CurrentSession).List<User>();
        }

        public IList<User> FindAll(int pageIndex, int pageSize)
        {
            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize).
                    GetExecutableCriteria(CurrentSession).List<User>();
        }

        #endregion

        private int Count(SimpleExpression countCondition)
        {
            return CreateCriteria().Add(countCondition).SetProjection(Projections.Count("Id")).UniqueResult<Int32>();
        }

        private ICriterion CreateSearchCondition(string loginId,
                                                 string email,
                                                 string phone, bool? islockout,
                                                 bool? isApproved)
        {
            ICriterion tion = null;
            if (islockout != null)
            {
                tion = Restrictions.Eq("IsLockout", islockout);
            }
            if (isApproved != null)
            {
                SimpleExpression iro = Restrictions.Eq("IsApproved", isApproved);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }


            if (!String.IsNullOrEmpty(loginId))
            {
                var iro = Restrictions.InsensitiveLike("LoginId", loginId);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            if (!String.IsNullOrEmpty(phone))
            {
                var iro = Restrictions.InsensitiveLike("Phone", phone);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            if (!String.IsNullOrEmpty(email))
            {
                var iro = Restrictions.InsensitiveLike("Email", email);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            return tion;
        }
    }
}