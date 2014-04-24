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
        ///     ��ȡUser ���е����ѷ������Ϣ��
        /// </summary>
        /// <param name="owner">�û�</param>
        /// <returns>��������owner�ķ���</returns>
        /// <exception cref="System.ArgumentNullException">owner Ϊ��</exception>
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