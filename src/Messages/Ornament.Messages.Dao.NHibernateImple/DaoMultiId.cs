using Qi.Domain;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public abstract class DaoMultiId<TObject> : DaoBase<object[], TObject>
        where TObject : DomainObject<TObject, object[]>
    {
        protected abstract TObject CreateObjectForLoad(object[] ids);

        protected abstract object[] CreateIdsFromObject(TObject t);

        public override TObject Get(object[] ids)
        {
            return CurrentSession.Get<TObject>(CreateObjectForLoad(ids));
        }

        public override TObject Load(object[] ids)
        {
            return CurrentSession.Load<TObject>(CreateObjectForLoad(ids));
        }
    }
}