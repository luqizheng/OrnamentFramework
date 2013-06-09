using System;
using System.Collections.Generic;
using NHibernate.Criterion;
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

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IList<Org> GetRootOrgs()
        {
            return CreateCriteria().Add(Restrictions.IsNull("OrderId")).List<Org>();
        }

        public bool InUse(string orgId)
        {
            Org org = Get(orgId);
            string maxOrderId;
            string minOrderId;

            Org.CreateGetChildCondition(org, out maxOrderId, out minOrderId);

            string hql = "select count(*) from User user where user.Org.OrderId>='{0}' and user.Org.OrderId<='{1}'";

            var oo = (Int64) CurrentSession.CreateQuery(String.Format(hql, minOrderId, maxOrderId)).UniqueResult();
            return oo > 0;
        }

        public IEnumerable<Org> Find(string name, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize)
                                           .Add(Restrictions.InsensitiveLike(NameProperty, name))
                                           .GetExecutableCriteria(CurrentSession).List<Org>();
        }

        public IEnumerable<Org> GetOrgs(string[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new Org[0];
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string a in ids)
            {
                disJunction.Add(Restrictions.Eq(Projections.Property<Org>(s => s.Id), a));
            }
            return
                CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<Org>();
        }
    }
}