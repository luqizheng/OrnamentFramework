using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    /// <summary>
    /// 
    /// </summary>
    public class OrgDao : DaoBase<string, Org>, IOrgDao
    {
        /// <summary>
        /// 
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

            var oo = (Int64)CurrentSession.CreateQuery(String.Format(hql, minOrderId, maxOrderId)).UniqueResult();
            return oo > 0;
        }



    }
}