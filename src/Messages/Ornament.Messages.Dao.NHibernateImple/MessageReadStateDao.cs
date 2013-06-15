using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip;
using Ornament.Messages.Notification;


namespace Ornament.Messages.Dao.NHibernateImple
{
    public class MessageReadStateDao : DaoMultiId<Reader>, IMessageReadStateDao
    {

        #region IInfoReadStateDao Members

        public Reader Get(User user, NotifyMessage notifyMessage)
        {
            return base.Get(new object[] { user, notifyMessage });
        }

        public IList<Reader> GetReadState(NotifyMessage notifyMessage)
        {
            return CreateCriteria().Add(Restrictions.Eq("Message", notifyMessage)).List<Reader>();
        }

        public IQueryable<Reader> ReaderReadStatus { get
        {
            return CurrentSession.Query<Reader>();
        } }

        #endregion

        protected override Reader CreateObjectForLoad(object[] ids)
        {
            var user = ids[0] as User;
            var info = ids[1] as NotifyMessage;
            if (user == null)
            {
                user = ids[1] as User;
                info = ids[0] as NotifyMessage;
            }
            return new Reader(user, info);
        }

        protected override object[] CreateIdsFromObject(Reader t)
        {
            return new object[] { t.Member, t.NotifyMessage };
        }

        public static IProjection Reader
        {
            get { return Projections.Property<Reader>(s => s.Member); }
        }

        public static IProjection State
        {
            get { return Projections.Property<Reader>(s => s.Status); }
        }
    }
}