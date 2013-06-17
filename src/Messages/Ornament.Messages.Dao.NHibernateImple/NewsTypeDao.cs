using System;
using System.Collections.Generic;
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
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
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IDictionary<NewsType, int> GetStatmemnt()
        {
            ProjectionList projectionList = Projections.ProjectionList();
            projectionList.Add(Projections.Property<News>(s => s.Type));
            projectionList.Add(Projections.RowCount());

            var f = DetachedCriteria.For<News>()
                                    .SetProjection(Projections.GroupProperty(Projections.Property<News>(s => s.Type)))
                                    .SetProjection(projectionList)
                                    .GetExecutableCriteria(this.CurrentSession).List<object[]>();

            var result = new Dictionary<NewsType, int>();

            foreach (var a in f)
            {
                result.Add((NewsType)a[0], Convert.ToInt32(1));
            }
            return result;

        }
        /// <summary>
        /// 
        /// </summary>
        public IQueryable<NewsType> MessageTypes
        {
            get { return CurrentSession.Query<NewsType>(); }
        }


        #endregion
    }
}