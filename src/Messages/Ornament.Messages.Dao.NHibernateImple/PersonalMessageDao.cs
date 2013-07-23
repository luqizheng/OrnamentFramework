﻿using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;
using Ornament.Messages.PersonalMessages;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class PersonalMessageDao : DaoBase<int, PersonalMessage>, IPersonalMessageDao
    {
        /// <summary>
        /// </summary>
        private IProjection ReceiverProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.Receiver); }
        }

        /// <summary>
        /// </summary>
        private IProjection PublisherProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.Publisher); }
        }

        /// <summary>
        /// </summary>
        private IProjection StateProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.ReadStatus); }
        }

        /// <summary>
        /// </summary>
        public IQueryable<PersonalMessage> PersonalMessages
        {
            get { return CurrentSession.Query<PersonalMessage>(); }
        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<PersonalMessage> GetNewMessage(User user, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(ReceiverProperty, user))
                .Add(Restrictions.Eq(StateProperty, ReadStatus.UnRead))
                .AddOrder(Order.Desc(Projections.Property<PersonalMessage>(s => s.CreateTime)))
                .SetMaxResults(pageSize)
                .SetFirstResult(pageIndex*pageSize)
                .GetExecutableCriteria(CurrentSession)
                .List<PersonalMessage>();
        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int CountNewMessage(User user)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(ReceiverProperty, user))
                .Add(Restrictions.Eq(StateProperty, ReadStatus.UnRead))
                .SetProjection(Projections.RowCount()).GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }


        /// <summary>
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="relative"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IList<PersonalMessage> GetChat(User owner, User relative, int pageIndex, int pageSize)
        {
            if (owner == null) throw new ArgumentNullException("owner");
            if (relative == null) throw new ArgumentNullException("relative");
            IProjection receiver = ReceiverProperty;
            IProjection publish = PublisherProperty;

            var receive = new Disjunction();
            receive.Add(Restrictions.Eq(receiver, owner));
            receive.Add(Restrictions.Eq(receiver, relative));

            var publisher = new Disjunction();
            publisher.Add(Restrictions.Eq(publish, owner));
            publisher.Add(Restrictions.Eq(publish, relative));

            return CreateDetachedCriteria()
                .Add(receive)
                .Add(publisher)
                .SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize)
                .GetExecutableCriteria(CurrentSession).List<PersonalMessage>();
        }
    }
}