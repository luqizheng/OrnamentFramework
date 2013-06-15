using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;


namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageReadStateDao : DaoMultiId<ReaderReadStatus>, IMessageReadStateDao
    {

        #region IInfoReadStateDao Members

        public ReaderReadStatus Get(User user, Message message)
        {
            return base.Get(new object[] { user, message });
        }

        public IList<ReaderReadStatus> GetReadState(Message message)
        {
            return CreateCriteria().Add(Restrictions.Eq("Message", message)).List<ReaderReadStatus>();
        }

        public IQueryable<ReaderReadStatus> ReaderReadStatus { get
        {
            return CurrentSession.Query<ReaderReadStatus>();
        } }

        #endregion

        protected override ReaderReadStatus CreateObjectForLoad(object[] ids)
        {
            var user = ids[0] as User;
            var info = ids[1] as Message;
            if (user == null)
            {
                user = ids[1] as User;
                info = ids[0] as Message;
            }
            return new ReaderReadStatus(user, info);
        }

        protected override object[] CreateIdsFromObject(ReaderReadStatus t)
        {
            return new object[] { t.Reader, t.Message };
        }

        public static IProjection Reader
        {
            get { return Projections.Property<ReaderReadStatus>(s => s.Reader); }
        }

        public static IProjection State
        {
            get { return Projections.Property<ReaderReadStatus>(s => s.Status); }
        }
    }
}