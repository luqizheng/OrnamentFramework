using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.Messages.Newses;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class NewsDao : DaoBase<string, News>, INewsDao
    {
        private IProjection TypeProperty
        {
            get { return Projections.Property<News>(s => s.Type); }
        }
        private IProjection CreateTimeProperty
        {
            get { return Projections.Property<News>(s => s.CreateTime); }
        }
        public IList<News> GetNews(int pageIndex, int pageSize, NewsType type, out int total)
        {
            total = CountMessage(type);
            DetachedCriteria cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(TypeProperty, type))
                .AddOrder(Order.Desc(CreateTimeProperty));
            cri.SetFirstResult(pageIndex*pageSize).SetMaxResults(pageSize);
            return cri.GetExecutableCriteria(CurrentSession).List<News>();
        }

        public int CountMessage(NewsType type)
        {
            return
                CreateDetachedCriteria().Add(Restrictions.Eq(TypeProperty, type)).SetProjection(Projections.RowCount())
                                        .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }
    }
}