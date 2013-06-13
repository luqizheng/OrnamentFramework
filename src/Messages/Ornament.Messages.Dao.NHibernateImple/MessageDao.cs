using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
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

        private IProjection CreateTimeProperty
        {
            get { return pools.Once(() => Projections.Property<Message>(s => s.CreateTime)); }
        }


        private IProjection MessageTypeProperty
        {
            get { return pools.Once(() => Projections.Property<Message>(s => s.Type)); }
        }

        private IProjection UserLoginidProperty
        {
            get { return Projections.Property<User>(s => s.LoginId); }
        }

        #region IInfoDao Members

        public IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType,
                                          out int total)
        {
            DetachedCriteria crit = CreateDetachedCriteria();
            DetachedCriteria pageCount = CreateDetachedCriteria();
            if (type != null)
            {
                if (includeSubType)
                {
                    Junction join = Restrictions.Disjunction()
                                                .Add(Restrictions.Eq("Type", type))
                                                .Add(Restrictions.Between("type.OrderId", CreateSubMinOrderId(type),
                                                                          CreateSubMaxOrderId(type)));
                    crit.CreateAlias("Type", "type").Add(join);
                    pageCount.CreateAlias("Type", "type").Add(join);
                }
                else
                {
                    crit.Add(Restrictions.Eq(MessageTypeProperty, type));
                    pageCount.Add(Restrictions.Eq(MessageTypeProperty, type));
                }
            }
            total =
                pageCount.SetProjection(Projections.Count<Message>(s => s.Id))
                         .GetExecutableCriteria(CurrentSession)
                         .UniqueResult<int>();
            return crit.SetFirstResult(pageSize * pageIndex)
                       .SetMaxResults(pageSize).GetExecutableCriteria(CurrentSession).List<Message>();
        }

        public IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType)
        {
            DetachedCriteria crit = CreateDetachedCriteria();

            if (type != null)
            {
                if (includeSubType)
                {
                    Junction join = Restrictions.Disjunction()
                                                .Add(Restrictions.Eq("Type", type))
                                                .Add(Restrictions.Between("type.OrderId", CreateSubMinOrderId(type),
                                                                          CreateSubMaxOrderId(type)));
                    crit.CreateAlias("Type", "type").Add(join);
                }
                else
                {
                    crit.Add(Restrictions.Eq(MessageTypeProperty, type));
                }
            }

            return crit.SetFirstResult(pageSize * pageIndex)
                       .SetMaxResults(pageSize).GetExecutableCriteria(CurrentSession).List<Message>();
        }

        public int CountReadStateMessage(PersonalSearcher searcher)
        {
            DetachedCriteria cri = BuildReadStateMessage(searcher);
            return cri.SetProjection(Projections.Count("Id"))
                      .GetExecutableCriteria(CurrentSession)
                      .UniqueResult<int>();
        }

        public IList<Message> ReadStateMessage(PersonalSearcher searcher)
        {
            DetachedCriteria cri = BuildReadStateMessage(searcher);
            return cri.SetFirstResult(searcher.PageIndex * searcher.PageSize).SetMaxResults(searcher.PageSize)
                      .GetExecutableCriteria(CurrentSession).List<Message>();
        }

        private DetachedCriteria BuildReadStateMessage(PersonalSearcher search)
        {
            if (search == null)
                throw new ArgumentNullException("search");
            DetachedCriteria crit = CreateDetachedCriteria();
            if (search.IncludeSubType)
                crit = SubType(crit, search.MessageType);
            else
                crit.Add(Restrictions.Eq(MessageTypeProperty, search.MessageType));
            
            crit.CreateAlias("Readers", "readers");

            var con = new Disjunction();
            con.Add(Restrictions.Eq("readers.Id", search.User.Id));
            if (search.User.Org != null)
                con.Add(Restrictions.Eq("readers.Id", search.User.Org.Id));
            crit.Add(con);


            DetachedCriteria ug = DetachedCriteria.For<User>()
                                                  .Add(Restrictions.Eq("Id", search.User.Id))
                                                  .CreateAlias("UserGroups", "ug")
                                                  .SetProjection(Projections.Property("ug.Id"));
            crit.Add(Subqueries.PropertyIn("readers.Id", ug));

            DetachedCriteria role = DetachedCriteria.For<User>()
                                                    .Add(Restrictions.Eq("Id", search.User.Id))
                                                    .CreateAlias("Roles", "role")
                                                    .SetProjection(Projections.Property("role.Id"));
            DetachedCriteria readed = DetachedCriteria.For<ReaderReadStatus>()
                                                      .Add(
                                                          Restrictions.Eq(
                                                              Projections.Property<ReaderReadStatus>(s => s.Reader),
                                                              search.User))
                                                      .Add(Restrictions.Eq(Projections.Property<ReaderReadStatus>(s => s.Status),search.ReadStatus))
                                                      .SetProjection(Projections.Property("Message.Id"));

            return crit.Add(Subqueries.PropertyIn("readers.Id", role)).Add(Subqueries.PropertyNotIn("Id", readed));
        }

        #endregion

        public IList<int> GetYear(string typeName, bool cacasde)
        {
            return
                CreateQuery(
                    "select distinct year(Message.PublishTime) From Message Message where Message.PublishTime not is null")
                    .List<int>();
        }

        private DetachedCriteria SubType(DetachedCriteria ica, MessageType type)
        {
            ica.CreateAlias("Type", "type");
            return ica.Add(Restrictions.Ge("type.OrderId", CreateSubMinOrderId(type)))
                      .Add(Restrictions.Ge("type.OrderId", CreateSubMaxOrderId(type)));
        }

        private static string CreateSubMaxOrderId(MessageType type)
        {
            if (type.Parent == null)
                return type.Id + MaxGuid;
            return string.Format("{0}.{1}.{2}", type.OrderId, type.Id, MaxGuid);
        }

        private static string CreateSubMinOrderId(MessageType type)
        {
            if (type.Parent == null)
                return type.Id + MinGuid;
            return string.Format("{0}.{1}.{2}", type.OrderId, type.Id, MinGuid);
        }
    }
}