using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    public class MessageDao : DaoBase<string, Message>, IMessageDao
    {
        private const string MaxGuid = ".ffffffffffffffffffffffffffffffff";
        private const string MinGuid = ".00000000000000000000000000000000";
        private readonly ObjectInitialization pools = new ObjectInitialization();


        private IProjection MessageTypeProperty
        {
            get { return pools.Once(() => Projections.Property<Message>(s => s.Type)); }
        }

        #region IInfoDao Members

        public IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, out int total)
        {
            DetachedCriteria crit = CreateDetachedCriteria();
            DetachedCriteria pageCount = CreateDetachedCriteria();
            if (type != null)
            {
                
                    crit.Add(Restrictions.Eq(MessageTypeProperty, type));
                    pageCount.Add(Restrictions.Eq(MessageTypeProperty, type));
               
            }
            total =
                pageCount.SetProjection(Projections.Count<Message>(s => s.Id))
                         .GetExecutableCriteria(CurrentSession)
                         .UniqueResult<int>();
            return crit.SetFirstResult(pageSize*pageIndex)
                       .SetMaxResults(pageSize).GetExecutableCriteria(CurrentSession).List<Message>();
        }

        public IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type)
        {
            DetachedCriteria crit = CreateDetachedCriteria();

            if (type != null)
            {
              
                    crit.Add(Restrictions.Eq(MessageTypeProperty, type));
               
            }

            return crit.SetFirstResult(pageSize*pageIndex)
                       .SetMaxResults(pageSize).GetExecutableCriteria(CurrentSession).List<Message>();
        }

        public int CountReadStateMessage(PersonalSearcher searcher)
        {
            DetachedCriteria cri = BuildReadStateMessage(searcher,
                                                         CreateDetachedCriteria()
                                                             .SetProjection(Projections.RowCount()), false);
            return cri
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<int>();
        }

        public IList<Message> ReadStateMessage(PersonalSearcher searcher)
        {
            DetachedCriteria cri = BuildReadStateMessage(searcher, CreateDetachedCriteria(), true);
            return cri.SetFirstResult(searcher.PageIndex*searcher.PageSize).SetMaxResults(searcher.PageSize)
                      .GetExecutableCriteria(CurrentSession).List<Message>();
        }

        public IQueryable<Message> Messages
        {
            get { return CurrentSession.Query<Message>(); }
        }

        private DetachedCriteria BuildReadStateMessage(PersonalSearcher search, DetachedCriteria crit, bool needOrder)
        {
            if (search == null)
                throw new ArgumentNullException("search");

            crit.Add(Restrictions.Eq(Projections.Property<Message>(s => s.State), MessageState.Published));
            if (needOrder)
            {
                crit.AddOrder(Order.Desc(Projections.Property<Message>(s => s.Priority)))
                    .AddOrder(Order.Asc(Projections.Property<Message>(s => s.CreateTime)));
            }


            crit.Add(Restrictions.Eq(MessageTypeProperty, search.MessageType));
            // filter read start=readed.
            DetachedCriteria readed = DetachedCriteria.For<ReaderReadStatus>()
                                                      .Add(
                                                          Restrictions.Eq(
                                                              MessageReadStateDao.Reader,
                                                              search.User))
                                                      .Add(
                                                          Restrictions.Eq(
                                                              MessageReadStateDao.State,
                                                              search.ReadStatus))
                                                      .SetProjection(Projections.Property("Message.Id"));
            crit.Add(Subqueries.PropertyNotIn("Id", readed));
            crit.CreateAlias("Readers", "readers")
                .Add(Subqueries.PropertyIn("readers.Id", BuildPerfomrer(search.User)));


            return crit;
        }

        #endregion

        private DetachedCriteria BuildPerfomrer(User user)
        {
            DetachedCriteria ug = DetachedCriteria.For<User>()
                                                  .Add(Restrictions.Eq("Id", user.Id))
                                                  .CreateAlias("UserGroups", "ug")
                                                  .SetProjection(Projections.Property("ug.Id"));


            DetachedCriteria role = DetachedCriteria.For<User>()
                                                    .Add(Restrictions.Eq("Id", user.Id))
                                                    .CreateAlias("Roles", "role")
                                                    .SetProjection(Projections.Property("role.Id"));
            DetachedCriteria performerQueue =
                DetachedCriteria.For<IPerformer>().SetProjection(Projections.Id()).Add(
                    (new Disjunction()).Add(Subqueries.PropertyIn("Id", role))
                                       .Add(Subqueries.PropertyIn("Id", ug))
                                       .Add(Restrictions.Eq(Projections.Id(), user.Id))
                    );

            if (user.Org != null)
                performerQueue.Add(Restrictions.Eq("Id", user.Org.Id));
            return performerQueue;
        }

        public IList<int> GetYear(string typeName, bool cacasde)
        {
            return
                CreateQuery(
                    "select distinct year(Message.PublishTime) From Message Message where Message.PublishTime not is null")
                    .List<int>();
        }
    }
}