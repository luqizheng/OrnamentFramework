using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.Type;
using Ornament.MemberShip.Properties;
using Qi;
using Qi.Domain.NHibernates;

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


        private IProjection NameProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Name)); }
        }

        private IProjection IdProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(u => u.Id)); }
        }

        private string ContactEmailProperty(string prefix)
        {
            if (!String.IsNullOrEmpty(prefix))
            {
                return prefix + "." + Projections.Property<User.ContactInfo>(u => u.Email).PropertyName;
            }
            return Projections.Property<User.ContactInfo>(u => u.Email).PropertyName;
        }

        private string ContactPhoneProperty(string prefix)
        {
            return prefix + "." + Projections.Property<User.ContactInfo>(s => s.Phone).PropertyName;
        }

        #endregion

        #region IUserDao Members

        public IQueryable<User> Users
        {
            get { return CurrentSession.Query<User>(); }
        }

        //public int Count()
        //{
        //    return CreateDetachedCriteria().SetProjection(Projections.RowCount()).SetCacheMode(CacheMode.Normal)
        //                                   .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        //}

        public IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex,
            int pageSize, out int total)
        {
            total = QuickSearch(name, loginid, email, phone).SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<int>();
            return QuickSearch(name, loginid, email, phone).SetFirstResult(pageIndex*pageSize)
                .SetMaxResults(pageSize)
                .GetExecutableCriteria(CurrentSession)
                .List<User>();
        }

        public IList<User> QuickSearchOffset(string name, string loginid, string email, string phone, int startRecord,
            int recordLength,
            out int total, params SortTarget[] sortTargets)
        {
            DetachedCriteria result = QuickSearch(name, loginid, email, phone);

            total = result
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
            result = QuickSearch(name, loginid, email, phone);
            if (sortTargets != null && sortTargets.Length != 0)
            {
                foreach (SortTarget a in sortTargets)
                {
                    result.AddOrder(a.Tag == SortTag.Asc
                        ? Order.Asc(Projections.Property(a.Property))
                        : Order.Desc(Projections.Property(a.Property)));
                }
            }
            return
                result.SetFirstResult(startRecord)
                    .SetMaxResults(recordLength)
                    .GetExecutableCriteria(CurrentSession)
                    .List<User>();
        }

        public IList<User> QuickSearch(string name, string loginid, string email, string phone, int pageIndex,
            int pageSize)
        {
            DetachedCriteria result = QuickSearch(name, loginid, email, phone);

            return
                result.SetFirstResult(pageIndex*pageSize)
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
            return
                CreateCriteria()
                    .CreateAlias("Contact", "contact")
                    .Add(Restrictions.Eq(ContactEmailProperty("contact"), email))
                    .UniqueResult<User>();
        }

        /// <summary>
        ///     获取在某日期之后处于活动状态的用户
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public int GetActivityDateNumber(DateTime time)
        {
            PropertyProjection projections = Projections.Property<User.OtherUserInfo>(s => s.LastActivityDate);
            SimpleExpression re = Restrictions.Ge(projections, time);
            return
                CreateCriteria()
                    .CreateCriteria("Other")
                    .Add(re)
                    .SetProjection(Projections.RowCount())
                    .UniqueResult<Int32>();
            //return Count(Restrictions.Le(projections, time));
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
                ica.SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize).GetExecutableCriteria(CurrentSession)
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
            return CreateDetachedCriteria().CreateCriteria("Contact")
                .Add(Restrictions.InsensitiveLike(ContactEmailProperty("contact"),
                    emailToMatch))
                .SetMaxResults(pageSize)
                .SetFirstResult(pageSize*pageIndex)
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
                CreateDetachedCriteria().Add(creator).AddOrder(order).SetFirstResult(pageIndex*pageSize).SetMaxResults(
                    pageSize)
                    .GetExecutableCriteria(CurrentSession)
                    .List<User>();
        }


        /// <summary>
        ///     Get User by LoginId
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">LoginId is null or empty</exception>
        public User GetByLoginId(string loginId)
        {
            try
            {
                if (String.IsNullOrEmpty(loginId))
                    throw new ArgumentNullException("loginId", "loginid can not be empty or null.");
                DetachedCriteria cri = CreateDetachedCriteria()
                    .Add(Restrictions.Eq(LoginProperty, loginId).IgnoreCase())
                    .SetCacheMode(CacheMode.Normal)
                    .SetCacheable(true);
                return cri.GetExecutableCriteria(CurrentSession).UniqueResult<User>();
            }
            catch (ObjectNotFoundException)
            {
                return null;
            }
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
            if (pageSize <= 0)
                throw new ArgumentOutOfRangeException("pageSize", Resources.PageSize_should_greater_than_zero);
            if (pageIndex < 0)
                throw new ArgumentOutOfRangeException("pageIndex", Resources.PageIndex_should_greater_than_zero_);
            return
                CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize).
                    GetExecutableCriteria(CurrentSession).List<User>();
        }

        public IList<User> FindAllOffset(int start, int length, out int total)
        {
            if (start < 0)
                throw new ArgumentOutOfRangeException("start", Resources.PageSize_should_greater_than_zero);
            if (length <= 0)
                throw new ArgumentOutOfRangeException("length", Resources.PageIndex_should_greater_than_zero_);
            total = CreateDetachedCriteria().SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
            return
                CreateDetachedCriteria().SetMaxResults(length).SetFirstResult(start).
                    GetExecutableCriteria(CurrentSession).List<User>();
        }

        public int Count(string loginId, string userIdForExclude)
        {
            DetachedCriteria detached =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .Add(Restrictions.Eq(LoginProperty, loginId).IgnoreCase());
            if (!String.IsNullOrEmpty(userIdForExclude))
                detached.Add(Restrictions.Not(Restrictions.IdEq(userIdForExclude)));

            return detached.GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        /// <summary>
        /// </summary>
        /// <param name="email"></param>
        /// <param name="idForExclude"></param>
        /// <returns></returns>
        public int CountByEmail(string email, string idForExclude)
        {
            DetachedCriteria a =
                DetachedCriteria.For<User.ContactInfo>()
                    .SetProjection(Projections.RowCount())
                    .Add(
                        Restrictions.Eq(Projections.Property<User.ContactInfo>(s => s.Email), email)
                            .IgnoreCase());

            if (!String.IsNullOrEmpty(idForExclude))
            {
                a.Add(
                    Restrictions.Not(Restrictions.Eq(Projections.Property<User.ContactInfo>(s => s.User.Id),
                        idForExclude)));
            }
            return a.GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public IDictionary<DateTime, int> CountNewUser(DateTime start, DateTime end)
        {
            var startTime = new DateTime(start.Year, start.Month, start.Day);
            var endTime = new DateTime(end.Year, end.Month, end.Day, 23, 59, 59, 999);
            IList count = DetachedCriteria.For<User>("user")
                .SetProjection(
                    Projections.ProjectionList()
                        .Add(Projections.SqlGroupProjection("year(CreateTime) year1",
                            "year(CreateTime)",
                            new[] {"year1"},
                            new IType[] {NHibernateUtil.Int32}))
                        .Add(Projections.SqlGroupProjection(
                            "Month(CreateTime) month1", "Month(CreateTime)",
                            new[] {"month1"}, new IType[] {NHibernateUtil.Int32}))
                        .Add(Projections.SqlGroupProjection("day(CreateTime) day1",
                            "day(CreateTime)",
                            new[] {"day1"},
                            new IType[] {NHibernateUtil.Int32}))
                        .Add(Projections.RowCount())
                )
                .CreateCriteria("Other")
                .Add(
                    Restrictions.Gt(
                        Projections.Property<User.OtherUserInfo>(s => s.CreateTime), startTime))
                .Add(
                    Restrictions.Le(
                        Projections.Property<User.OtherUserInfo>(s => s.CreateTime), endTime))
                .GetExecutableCriteria(CurrentSession)
                .List();
            var dictionary = new Dictionary<DateTime, int>();
            foreach (object[] objects in count)
            {
                dictionary.Add(new DateTime((int) objects[0], (int) objects[1], (int) objects[2]), (int) objects[3]);
            }
            return dictionary;
        }

        public IList<string> GetOnlineUsers(DateTime time)
        {
            PropertyProjection projections = Projections.Property<User.OtherUserInfo>(s => s.LastActivityDate);
            SimpleExpression re = Restrictions.Ge(projections, time);
            return
                CreateDetachedCriteria()
                    .CreateCriteria("Other")
                    .Add(re)
                    .SetProjection(Projections.Property<User>(s => s.LoginId))
                    .GetExecutableCriteria(CurrentSession)
                    .List<string>();
        }

        private DetachedCriteria QuickSearch(string name, string loginid, string email, string phone)
        {
            DetachedCriteria result = CreateDetachedCriteria().CreateAlias("Contact", "contact");


            Disjunction userInfo = Restrictions.Disjunction();
            result.Add(userInfo);

            if (!string.IsNullOrEmpty(loginid))
                userInfo.Add(Restrictions.InsensitiveLike(LoginProperty, loginid));
            if (!string.IsNullOrEmpty(name))
                userInfo.Add(Restrictions.InsensitiveLike(NameProperty, name));


            if (!string.IsNullOrEmpty(email))
            {
                userInfo.Add(Restrictions.InsensitiveLike(ContactEmailProperty("contact"), email));
            }
            if (!string.IsNullOrEmpty(phone))
            {
                userInfo.Add(Restrictions.InsensitiveLike(ContactPhoneProperty("contact"), name));
            }
            return result;
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