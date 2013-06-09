using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using Ornament.MemberShip;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// 
    /// </summary>
    public class MessageDao : DaoBase<string, Message>, IMessageDao
    {
        private const string maxGuid = ".ffffffffffffffffffffffffffffffff";
        private const string minGuid = ".00000000000000000000000000000000";
        private readonly ObjectInitialization pools = new ObjectInitialization();

        private IProjection CreateTimeProperty
        {
            get { return pools.Once(() => Projections.Property<Message>(s => s.CreateTime)); }
        }


        private IProjection MessageTypeProperty
        {
            get { return pools.Once(() => Projections.Property<Message>(s => s.Type)); }
        }

        #region IInfoDao Members

        public Message GetNoLazyMessage(string id)
        {
            return CreateDetachedCriteria().Add(Restrictions.Eq("Id", id))
                                           .SetFetchMode("Contents", FetchMode.Select)
                                           .SetFetchMode("Readers",FetchMode.Select)
                                           .GetExecutableCriteria(this.CurrentSession)
                                           .UniqueResult<Message>();

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="cacasde"></param>
        /// <returns></returns>
        public IList<Message> Find(string typeName, int pageIndex, int pageSize, bool cacasde, MessageState state)
        {
            try
            {
                IQuery query;
                if (cacasde)
                {
                    var typeDao = new MessageTypeDao();
                    MessageType type;

                    type = typeDao.Get(typeName);

                    if (type == null)
                        return new List<Message>();

                    string minTypeId = type.Id;
                    string maxTypeId = type.Id + ".FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
                    query =
                        CreateQuery(
                            @"From Message Message where (Message.Type=? or Message.Type in (select type.Id from MessageType type where type.OrderId >= ? and type.OrderId<=?)) and Message.State=? order by Message.CreateTime desc");
                    query.SetString(0, type.Id);
                    query.SetString(1, minTypeId);
                    query.SetString(2, maxTypeId);
                    query.SetEnum(3, state);
                }
                else
                {
                    query =
                        CreateQuery(
                            "From Message Message where Message.Type.Name=? and state=? order by Message.CreateTime desc");
                    query.SetString(0, typeName);
                    query.SetEnum(1, state);
                }

                query.SetFirstResult(pageIndex * pageSize);
                query.SetMaxResults(pageSize);

                return query.List<Message>();
            }
            catch (ArgumentOutOfRangeException ex)
            {
                throw new ArgumentException(String.Format("can't find Message type named '{0}'", typeName),
                                            "typeName",
                                            ex);
            }
        }

        public IList<Message> Find(Guid typeId, int pageIndex, int pageSize, bool cacasde, MessageState state)
        {
            IQuery query;
            if (cacasde)
            {
                string minTypeId = typeId + ".00000000-0000-0000-0000-000000000000";
                string maxTypeId = typeId + ".FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
                query =
                    CreateQuery(
                        @"From Message Message where 
(Message.Type.Id=? or Message.Type in (select type.Id from MessageType type where type.OrderId >= ? and type.OrderId<=?)) 
and Message.State=? order by Message.CreateTime desc");
                query.SetString(1, minTypeId);
                query.SetString(2, maxTypeId);
                query.SetEnum(3, state);
            }
            else
            {
                query =
                    CreateQuery(
                        "From Message Message where Message.Type.Id=? and Message.state=? order by Message.CreateTime desc");
                query.SetEnum(1, state);
            }

            query.SetFirstResult(pageIndex * pageSize);
            query.SetMaxResults(pageSize);
            query.SetGuid(0, typeId);

            return query.List<Message>();
        }

        public IList<Message> Find(string typeName, DateTime startTime, DateTime endTime, MessageState state,
                                   bool cacasde,
                                   object createQuery)
        {
            IQuery query;
            if (cacasde)
            {
                var typeDao = new MessageTypeDao();
                MessageType type = typeDao.Get(typeName);
                if (type == null)
                    return new List<Message>();
                string minTypeId = type.Id;
                string maxTypeId = type.Id + ".ffffffffffffffffffffffffffffffff";

                const string sql =
                    @"From Message Message where 
(Message.Type.Id=? or Message.Type in (select type.Id from MessageType type where type.OrderId >= ? and type.OrderId<=?)) 
and Message.State=? and Message.PublishTime>=? and Message.PublishTime<=? order by Message.CreateTime desc";
                query = CreateQuery(sql);
                query.SetString(0, type.Id);
                query.SetString(1, minTypeId);
                query.SetString(2, maxTypeId);
                query.SetEnum(3, state);
                query.SetTime(4, startTime);
                query.SetTime(5, endTime);
            }
            else
            {
                query =
                    CreateQuery(
                        "From Message Message where Message.Type.Name=? and state=?  and Message.PublishTime>=? and Message.PublishTime<=? order by Message.CreateTime desc");
                query.SetString(0, typeName);
                query.SetEnum(1, state);
                query.SetTime(2, startTime);
                query.SetTime(3, endTime);
            }
            return query.List<Message>();
        }

        public IList<Message> Find(User user, int pageSize, int pageIndex, params string[] typeNames)
        {
            var s = new MessageSearcher
                        {
                            RelivateUser = user,
                            PageIndex = pageIndex,
                            PageSize = pageSize,
                            ReadStatus = ReadStatus.Read,
                            TypeNames = typeNames
                        };
            return Find(s);
        }


        public IList<Message> Find(MessageSearcher search)
        {
            DetachedCriteria userReadStateCriteria = DetachedCriteria.For<ReaderReadStatus>();

            if (search.ReadStatus != null)
            {
                //因为在下面的查询语句中，使用NotIn，因此Search为Read，这个语句就要改为unRead
                userReadStateCriteria.Add(Restrictions.Eq("Status",
                                                          search.ReadStatus == ReadStatus.Read
                                                              ? ReadStatus.UnRead
                                                              : ReadStatus.Read));
            }


            DetachedCriteria cri = DetachedCriteria.For<Message>().AddOrder(Order.Desc("Priority"));


            if (search.TypeNames != null && search.TypeNames.Length != 0)
            {
                cri.CreateAlias("Type", "type").Add(Restrictions.In("type.Name", search.TypeNames.ToArray()));
            }
            if (userReadStateCriteria != null)
            {
                userReadStateCriteria.SetProjection(Projections.Property("Message"));
                cri.Add(Subqueries.PropertyNotIn("Id", userReadStateCriteria));
            }
            Iesi.Collections.Generic.ISet<Role> roles;
            Iesi.Collections.Generic.ISet<User> users;
            Iesi.Collections.Generic.ISet<UserGroup> usergroups;
            search.GetPerformers(out users, out roles, out usergroups);

            Junction allPerformers = Restrictions.Disjunction()
                .Add(CreatePerformersRestriction(users))
                .Add(CreatePerformersRestriction(roles))
                .Add(CreatePerformersRestriction(usergroups));

            cri.CreateCriteria("Readers").Add(allPerformers);
            return
                cri.GetExecutableCriteria(CurrentSession).SetMaxResults(search.PageSize).SetFirstResult(
                    search.GetFirstResult())
                    .List<Message>
                    ();
        }

        public IList<Message> FindMessage(int pageSize, int pageIndex, MessageType type, bool includeSubType)
        {
            DetachedCriteria crit = CreateDetachedCriteria()
                .SetFirstResult(pageSize * pageIndex)
                .SetMaxResults(pageSize);

            if (type != null)
            {
                if (includeSubType)
                {
                    ;
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

            return crit.GetExecutableCriteria(CurrentSession).List<Message>();
        }

        #endregion

        private static Disjunction CreatePerformersRestriction<T>(IEnumerable<T> performers)
        {
            Disjunction result = Restrictions.Disjunction();
            foreach (T usergroup in performers)
            {
                result.Add(Restrictions.Eq("MessageReader", usergroup));
            }
            return result;
        }

        public IList<int> GetYear(string typeName, bool cacasde)
        {
            return
                CreateQuery(
                    "select distinct year(Message.PublishTime) From Message Message where Message.PublishTime not is null")
                    .
                    List<int>();
        }

        private static string CreateSubMaxOrderId(MessageType type)
        {
            if (type.Parent == null)
                return type.Id + maxGuid;
            return string.Format("{0}.{1}.{2}", type.OrderId, type.Id, maxGuid);
        }

        private static string CreateSubMinOrderId(MessageType type)
        {
            if (type.Parent == null)
                return type.Id + minGuid;
            return string.Format("{0}.{1}.{2}", type.OrderId, type.Id, minGuid);
        }
    }
}