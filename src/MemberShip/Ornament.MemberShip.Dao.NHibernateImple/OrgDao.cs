using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.MemberShip.Properties;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    public class OrgDao : DaoBase<string, Org>, IOrgDao
    {
        protected IProjection NameProperty
        {
            get { return Projections.Property<Org>(s => s.Name); }
        }

        protected IProjection ParentProperty
        {
            get { return Projections.Property<Org>(s => s.Parent); }
        }

        protected IProjection OrderIdProperty
        {
            get { return Projections.Property<Org>(s => s.OrderId); }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IList<Org> GetRootOrgs()
        {
            return CreateCriteria().Add(Restrictions.IsNull(OrderIdProperty)).List<Org>();
        }

        public bool InUse(string orgId)
        {
            if (string.IsNullOrEmpty(orgId))
                throw new ArgumentNullException("orgId");
            Org org = Get(orgId);
            string maxOrderId;
            string minOrderId;

            Org.CreateGetChildCondition(org, out maxOrderId, out minOrderId);

            const string hql =
                "select count(*) from User user where user.Org.OrderId>='{0}' and user.Org.OrderId<='{1}'";

            var oo = (Int64) CurrentSession.CreateQuery(String.Format(hql, minOrderId, maxOrderId)).UniqueResult();
            return oo > 0;
        }

        public Org GetByName(string name, Org parent)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(NameProperty, name))
                .Add(Restrictions.Eq(ParentProperty, parent))
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<Org>();
        }


        public Org GetRootOrgBy(string name)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(NameProperty, name))
                .Add(Restrictions.IsNull(ParentProperty))
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<Org>();
        }

        public IEnumerable<Org> Find(string name, int pageIndex, int pageSize)
        {
            if (pageSize <= 0)
                throw new ArgumentOutOfRangeException("pageSize", Resources.PageSize_should_greater_than_zero);
            if (pageIndex < 0)
                throw new ArgumentOutOfRangeException("pageIndex", Resources.PageIndex_should_greater_than_zero_);
            return CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize)
                .Add(Restrictions.InsensitiveLike(NameProperty, name))
                .GetExecutableCriteria(CurrentSession).List<Org>();
        }

        public IEnumerable<Org> Find(Org scope, string name, int pageIndex, int pageSize)
        {
            if (pageSize <= 0)
                throw new ArgumentOutOfRangeException("pageSize", Resources.PageSize_should_greater_than_zero);
            if (pageIndex < 0)
                throw new ArgumentOutOfRangeException("pageIndex", Resources.PageIndex_should_greater_than_zero_);
            string min, max;
            Org.CreateGetChildCondition(scope, out max, out min);

            return CreateDetachedCriteria()
                .Add(Restrictions.Le(OrderIdProperty, max))
                .Add(Restrictions.Ge(OrderIdProperty, min))
                .SetMaxResults(pageSize)
                .SetFirstResult(pageIndex*pageSize)
                .Add(Restrictions.InsensitiveLike(NameProperty, name))
                .GetExecutableCriteria(CurrentSession).List<Org>();
        }

        public IEnumerable<Org> GetOrgs(string[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new Org[0];
            return
                CreateDetachedCriteria().Add(Restrictions.In(Projections.Property<Org>(s => s.Id), ids))
                    .GetExecutableCriteria(CurrentSession).List<Org>();
        }

        public IEnumerable<Org> GetSubOrgs(Org org)
        {
            string maxOrderId;
            string minOrderId;

            Org.CreateGetChildCondition(org, out maxOrderId, out minOrderId);
            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Le(OrderIdProperty, maxOrderId))
                    .Add(Restrictions.Ge(OrderIdProperty, minOrderId))
                    .GetExecutableCriteria(CurrentSession).List<Org>();
        }
    }
}