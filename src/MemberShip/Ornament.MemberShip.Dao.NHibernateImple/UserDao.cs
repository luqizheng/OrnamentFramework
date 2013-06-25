using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.Type;
using Qi;
using Qi.Domain.NHibernates;
using Qi.NHibernateExtender;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class UserDao : DaoBase<string, User>, IUserDao
    {
        private readonly ObjectInitialization _pools = new ObjectInitialization();

        #region Properoty Projections.

        private IProjection LoginProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.LoginId)); }
        }

        private IProjection EmailProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Email)); }
        }

        private IProjection NameProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Name)); }
        }

        private IProjection IdProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Id)); }
        }
        private IProjection PhoneProperty
        {
            get { return Projections.Property<User>(s => s.Phone); }
        }
        #endregion

        #region IUserDao Members



        public IQueryable<User> Users
        {
            get { return SessionManager.Instance.GetCurrentSession().Query<User>(); }
        }

        public int Count()
        {
            return CreateDetachedCriteria().SetProjection(Projections.RowCount()).SetCacheMode(CacheMode.Normal)
                                           .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex,
                                       int pageSize)
        {
            DetachedCriteria result = CreateDetachedCriteria();
            Disjunction a = Restrictions.Disjunction();
            if (!string.IsNullOrEmpty(loginid))
                a.Add(Restrictions.InsensitiveLike(LoginProperty, loginid));
            if (!string.IsNullOrEmpty(email))
                a.Add(Restrictions.InsensitiveLike(EmailProperty, email));
            if (!string.IsNullOrEmpty(name))
                a.Add(Restrictions.InsensitiveLike(NameProperty, name));
            if (!string.IsNullOrEmpty(phone))
            {
                a.Add(Restrictions.InsensitiveLike(PhoneProperty, name));
            }
            result.Add(a);
            return
                result.SetFirstResult(pageIndex * pageSize)
                      .SetMaxResults(pageSize)
                      .GetExecutableCriteria(CurrentSession)
                      .List<User>();
        }

        /// <summary>
        ///     获取用户
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

        public IList<User> GetUsersByIds(string[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new List<User>();
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string loginid in ids)
            {
                disJunction.Add(Restrictions.Eq(IdProperty, loginid).IgnoreCase());
            }

            return CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<User>();
        }

        /// <summary>
        ///     根据角色Id获取用户
        /// </summary>
        /// <param name="roleId">角色Id</param>
        /// <returns></returns>
        public IList<User> GetUsersInRole(string roleId)
        {
            return CreateDetachedCriteria()
                .CreateCriteria("Roles")
                .Add(Restrictions.Eq("Id", roleId).IgnoreCase())
                .GetExecutableCriteria(CurrentSession).List<User>();
        }

        /// <summary>
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
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public User GetUserByEmail(string email)
        {
            return CreateCriteria().Add(Restrictions.Eq(EmailProperty, email)).UniqueResult<User>();
        }

        /// <summary>
        ///     获取在某日期之后处于活动状态的用户
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public int GetActivityDateNumber(DateTime time)
        {
            return Count(Restrictions.Le("LastActivityDate", time));
        }

        /// <summary>
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
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="islockout"></param>
        /// <param name="isApproved"></param>
        /// <param name="startRow"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<User> Search(string loginId, string email, string phone, bool? islockout, bool? isApproved,
                                  int? startRow, int? pageSize)
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

        public IList<User> GetUsers(Org org)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<User>(s => s.Org), org))
                .GetExecutableCriteria(CurrentSession).List<User>();
        }

        public IList<User> FindAll(int pageIndex, int pageSize)
        {
            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize).
                                         GetExecutableCriteria(CurrentSession).List<User>();
        }

        public int Count(string loginId)
        {
            return
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .Add(Restrictions.Eq(LoginProperty, loginId).IgnoreCase())
                    .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        /// <summary>
        /// </summary>
        /// <param name="email"></param>
        /// <param name="loginIdForExclude"></param>
        /// <returns></returns>
        public int CountByEmail(string email, string loginIdForExclude)
        {
            DetachedCriteria a =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .Add(Restrictions.Eq(EmailProperty, email).IgnoreCase());
            if (!String.IsNullOrEmpty(loginIdForExclude))
            {
                a.Add(Restrictions.Not(Restrictions.Eq(LoginProperty, loginIdForExclude).IgnoreCase()));
            }

            return a.GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public IDictionary<DateTime, int> CountNewUser(DateTime start, DateTime end)
        {
            var startTime = new DateTime(start.Year, start.Month, start.Day);
            var endTime = new DateTime(end.Year, end.Month, end.Day, 23, 59, 59, 999);
            var count = DetachedCriteria.For<User>("user")
                .SetProjection(
                    Projections.ProjectionList()
                    .Add(Projections.SqlGroupProjection("year(CreateTime)", "year(CreateTime)", new[] { "year" }, new IType[] { NHibernateUtil.Int32 }))
                    .Add(Projections.SqlGroupProjection("Month(CreateTime)", "Month(CreateTime)", new[] { "Month" }, new IType[] { NHibernateUtil.Int32 }))
                    .Add(Projections.SqlGroupProjection("day(CreateTime)", "day(CreateTime)", new[] { "day" }, new IType[] { NHibernateUtil.Int32 }))
                    .Add(Projections.RowCount())
                    )
                .Add(Restrictions.Gt(Projections.Property<User>(s => s.CreateTime), startTime))
                .Add(Restrictions.Le(Projections.Property<User>(s => s.CreateTime), endTime))
                .GetExecutableCriteria(this.CurrentSession)
                .List();
            Dictionary<DateTime, int> dictionary = new Dictionary<DateTime, int>();
            foreach (object[] objects in count)
            {
                dictionary.Add(new DateTime((int) objects[0], (int) objects[1], (int) objects[2]), (int) objects[3]);
            }
            return dictionary;

        }

        /// <summary>
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

        #endregion

        private int Count(SimpleExpression countCondition)
        {
            return CreateCriteria().Add(countCondition).SetProjection(Projections.RowCount()).UniqueResult<Int32>();
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
                AbstractCriterion iro = Restrictions.InsensitiveLike("LoginId", loginId);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            if (!String.IsNullOrEmpty(phone))
            {
                AbstractCriterion iro = Restrictions.InsensitiveLike("Phone", phone);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            if (!String.IsNullOrEmpty(email))
            {
                AbstractCriterion iro = Restrictions.InsensitiveLike("Email", email);
                tion = tion != null ? Restrictions.And(tion, iro) : iro;
            }
            return tion;
        }
    }
}