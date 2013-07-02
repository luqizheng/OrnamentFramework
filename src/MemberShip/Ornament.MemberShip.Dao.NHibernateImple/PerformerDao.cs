using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
using Qi.NHibernateExtender;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    /// <summary>
    /// 
    /// </summary>
    public class PerformerDao : IPerformerDao
    {
        public ISession CurrentSession
        {
            get { return SessionManager.Instance.GetCurrentSession(); }
        }

        #region IPerformerDao Members

        public IList<IPerformer> Find(string roleId)
        {
            IList<User> user = DetachedCriteria.For<User>().CreateCriteria("Roles", "role").
                Add(Restrictions.Eq("Id", roleId))
                .GetExecutableCriteria(CurrentSession).List<User>();
            IList<UserGroup> userGroup = DetachedCriteria.For<UserGroup>().CreateCriteria("Roles", "role").
                Add(Restrictions.Eq("Id", roleId))
                .GetExecutableCriteria(CurrentSession).List<UserGroup>();
            var result = new List<IPerformer>();
            result.AddRange(user);
            result.AddRange(userGroup);
            return result;
        }

        #endregion
    }
}