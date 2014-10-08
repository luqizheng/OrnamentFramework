using System;
using System.CodeDom;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class StatisticsDao : DaoBase<int, UserStatistics>, IUserStatisticsDao
    {
        private IProjection CreateTime
        {
            get { return Projections.Property<UserStatistics>(s => s.CreateDate); }
        }

        public UserStatistics Get(DateTime date)
        {
            return CreateCriteria().Add(Restrictions.Eq(CreateTime, date))
                .UniqueResult<UserStatistics>();
        }

        public IList<UserStatistics> FindByDate(DateTime start, DateTime end)
        {
            var result = 
                CreateDetachedCriteria()
                    .Add(Restrictions.Le(CreateTime, end))
                    .Add(Restrictions.Ge(CreateTime, start))
                    .AddOrder(Order.Asc(CreateTime))
                    .GetExecutableCriteria(CurrentSession)
                    .List<UserStatistics>();

            var list = new List<UserStatistics>();
            var cur = start;
            var curIndex = 0;
            
            while (!(cur > end))
            {
                if (result[curIndex].CreateDate == cur)
                {
                    list.Add(result[curIndex]);
                    curIndex++;
                }
                else
                {
                    list.Add(new UserStatistics()
                    {
                        CreateDate = cur
                    });
                }

                cur = cur.AddDays(1);
            }

            return list;


        }
    }
}