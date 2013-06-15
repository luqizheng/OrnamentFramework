﻿using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
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

            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(Projections.Property<MessageType>(type => type.Name), name))
                    .GetExecutableCriteria(this.CurrentSession)
                    .UniqueResult<MessageType>();

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

        public IQueryable<MessageType> MessageTypes { get { return CurrentSession.Query<MessageType>(); } }

        #endregion
    }
}