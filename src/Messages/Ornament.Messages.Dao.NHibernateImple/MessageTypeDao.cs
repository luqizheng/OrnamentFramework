using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageTypeDao : DaoBase<string, MessageType>, IMessageTypeDao
    {
        IProjection Parent { get { return Projections.Property<MessageType>(x => x.Parent); } }
        #region IInfoTypeDao Members

        public IList<MessageType> GetFirstLevel()
        {
            return CreateCriteria().Add(Restrictions.IsNull(Parent)).List<MessageType>();
        }

        public MessageType GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            ICriteria criteria = CreateCriteria();
            IList<MessageType> list = criteria.Add(Restrictions.Eq("Name", name)).List<MessageType>();
            if (list.Count == 0)
            {
                return null;
            }
            return list[0];
        }

        public IList<MessageType> GetList(MessageType parent)
        {
            if (parent == null)
                throw new ArgumentNullException("parent");
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Parent, parent))
                .GetExecutableCriteria(this.CurrentSession)
                .List<MessageType>();
        }

        #endregion
    }
}