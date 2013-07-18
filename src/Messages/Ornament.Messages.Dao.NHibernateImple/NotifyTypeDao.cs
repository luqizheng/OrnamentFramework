using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class NotifyTypeDao : DaoBase<string, NotifyType>, INotifyTypeDao
    {
        private IProjection NameProperty
        {
            get { return Projections.Property<NotifyType>(s => s.Name); }
        }

        public IQueryable<NotifyType> Types { get { return CurrentSession.Query<NotifyType>(); } }

        public NotifyType GetByName(string name)
        {
            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(NameProperty, name))
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<NotifyType>();
        }
    }
}