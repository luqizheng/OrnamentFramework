using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip.Properties;
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

        public IQueryable<News> Newses
        {
            get { return CurrentSession.Query<News>(); }
        }

        /// <summary>
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="type"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public IList<News> GetNews(int pageIndex, int pageSize, NewsType type, out int total)
        {
            if (pageSize <= 0)
                throw new ArgumentOutOfRangeException("pageSize", Resources.PageSize_should_greater_than_zero);
            if (pageIndex < 0)
                throw new ArgumentOutOfRangeException("pageIndex", Resources.PageIndex_should_greater_than_zero_);


            total = CountMessage(type);

            DetachedCriteria cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(TypeProperty, type))
                .AddOrder(Order.Desc(CreateTimeProperty));
            cri.SetFirstResult(pageIndex*pageSize).SetMaxResults(pageSize);
            return cri.GetExecutableCriteria(CurrentSession).List<News>();
        }

        /// <summary>
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public int CountMessage(NewsType type)
        {
            if (type == null) throw new ArgumentNullException("type");
            return
                CreateDetachedCriteria().Add(Restrictions.Eq(TypeProperty, type)).SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }
    }
}