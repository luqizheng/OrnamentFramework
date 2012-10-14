using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
using Qi.NHibernate;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    /// <summary>
    /// 
    /// </summary>
    public class MemberDao : IMemberDao
    {
        public ISession CurrentSession
        {
            get { return SessionManager.Instance.GetCurrentSession(); }
        }

        #region IMemberDao Members

        public IList<IMember> Find(string roleId)
        {
            IList<User> user = DetachedCriteria.For<User>().CreateCriteria("Roles", "role").
                Add(Restrictions.Eq("Id", roleId))
                .GetExecutableCriteria(CurrentSession).List<User>();
            IList<UserGroup> userGroup = DetachedCriteria.For<UserGroup>().CreateCriteria("Roles", "role").
                Add(Restrictions.Eq("Id", roleId))
                .GetExecutableCriteria(CurrentSession).List<UserGroup>();
            var result = new List<IMember>();
            result.AddRange(user);
            result.AddRange(userGroup);
            return result;
        }

        #endregion
    }
}