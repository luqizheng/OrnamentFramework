using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.MemberShip.Relatives;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class FriendGroupDao : DaoBase<string, FriendGroup>, IFriendGroupDao
    {
        private IProjection OwnerProperty
        {
            get { return Projections.Property<FriendGroup>(s => s.Owner); }
        }

        private IProjection NameProperty
        {
            get { return Projections.Property<FriendGroup>(s => s.Name); }
        }

        /// <summary>
        ///     获取User 所有的朋友分组的信息。
        /// </summary>
        /// <param name="owner">用户</param>
        /// <returns>所有属于owner的分组</returns>
        /// <exception cref="System.ArgumentNullException">owner 为空</exception>
        public IList<FriendGroup> GetGroups(User owner)
        {
            return CreateDetachedCriteria().Add(Restrictions.Eq(OwnerProperty, owner))
                .GetExecutableCriteria(CurrentSession).List<FriendGroup>();
        }

        public FriendGroup GetByName(string groupName)
        {
            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(NameProperty, groupName))
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<FriendGroup>();
        }
    }
}