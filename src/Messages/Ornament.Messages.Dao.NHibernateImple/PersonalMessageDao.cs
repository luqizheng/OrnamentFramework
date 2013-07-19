using System;
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
        IProjection ReceiverProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.Receiver); }
        }
        IProjection PublisherProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.Publisher); }
        }
        IProjection StateProperty
        {
            get { return Projections.Property<PersonalMessage>(s => s.ReadStatus); }
        }

        public IQueryable<PersonalMessage> Types { get { return CurrentSession.Query<PersonalMessage>(); } }

        public IList<PersonalMessage> GetNewMessage(User user, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(ReceiverProperty, user))
                .Add(Restrictions.Eq(StateProperty, ReadStatus.UnRead))
                .SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize).GetExecutableCriteria(this.CurrentSession).List<PersonalMessage>();
        }

        public int CountNewMessage(User user)
        {
            return CreateDetachedCriteria()
                 .Add(Restrictions.Eq(ReceiverProperty, user))
                 .Add(Restrictions.Eq(StateProperty, ReadStatus.UnRead))
                 .SetProjection(Projections.RowCount()).GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
        }

        public IList<PersonalMessage> GetChat(User owner, User relative, int pageIndex, int pageSize)
        {
            if (owner == null) throw new ArgumentNullException("owner");
            if (relative == null) throw new ArgumentNullException("relative");
            var receiver = ReceiverProperty;
            var publish = PublisherProperty;
            
            var receive=new Disjunction();
            receive.Add(Restrictions.Eq(receiver, owner));
            receive.Add(Restrictions.Eq(receiver, relative));

            var publisher = new Disjunction();
            publisher.Add(Restrictions.Eq(publish, owner));
            publisher.Add(Restrictions.Eq(publish, relative));

            return CreateDetachedCriteria()
                 .Add(receive)
                 .Add(publisher)
                 .SetMaxResults(pageSize).SetFirstResult(pageIndex * pageSize)
                 .GetExecutableCriteria(this.CurrentSession).List<PersonalMessage>();
        }
    }
}