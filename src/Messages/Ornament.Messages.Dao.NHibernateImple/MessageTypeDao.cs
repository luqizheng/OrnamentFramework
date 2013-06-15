using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageTypeDao : DaoBase<string, MessageType>, IMessageTypeDao
    {
        #region IInfoTypeDao Members

       

        public MessageType GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");

            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(Projections.Property<MessageType>(type => type.Name), name))
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<MessageType>();
        }

        public IList<MessageType> GetList(MessageType parent)
        {
            if (parent == null)
                throw new ArgumentNullException("parent");
            return CreateDetachedCriteria()
                .GetExecutableCriteria(CurrentSession)
                .List<MessageType>();
        }

        public IQueryable<MessageType> MessageTypes
        {
            get { return CurrentSession.Query<MessageType>(); }
        }

        #endregion
    }
}