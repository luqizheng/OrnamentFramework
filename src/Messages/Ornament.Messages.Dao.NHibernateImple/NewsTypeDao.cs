using System;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.Messages.Newses;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class NewsTypeDao : DaoBase<string, NewsType>, INewsTypeDao
    {
        #region IInfoTypeDao Members

        public NewsType GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");

            return
                CreateDetachedCriteria()
                    .Add(Restrictions.Eq(Projections.Property<NewsType>(type => type.Name), name))
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<NewsType>();
        }

        public IQueryable<NewsType> MessageTypes
        {
            get { return CurrentSession.Query<NewsType>(); }
        }


        #endregion
    }
}