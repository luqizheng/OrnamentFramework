using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// </summary>
    internal class NotifyMessageTemplateDao : DaoBase<string, NotifyMessageTemplate>, IMessageTemplateDao
    {
        private IProjection NameProperty
        {
            get { return Projections.Property<NotifyMessageTemplate>(s => s.Name); }
        }

        public IQueryable<NotifyMessageTemplate> NotifyMessageTemplates
        {
            get { return CurrentSession.Query<NotifyMessageTemplate>(); }
        }

        public int Count(string name, string excludeId)
        {
            if (name == null)
                throw new ArgumentNullException("name");

            DetachedCriteria re = CreateDetachedCriteria()
                .Add(Restrictions.Eq(NameProperty, name));

            if (string.IsNullOrEmpty(excludeId))
            {
                return re.SetProjection(Projections.RowCount()).GetExecutableCriteria(CurrentSession).UniqueResult<int>();
            }
            re = re.Add(Restrictions.Not(Restrictions.Eq(Projections.Id(), excludeId)));
            return re.SetProjection(Projections.RowCount()).GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }


        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public NotifyMessageTemplate GetByName(string name)
        {
            return DetachedCriteria.For<NotifyMessageTemplate>()
                .Add(
                    Restrictions.Eq(
                        Projections.Property<NotifyMessageTemplate>(s => s.Name), name).IgnoreCase())
                .GetExecutableCriteria(CurrentSession).UniqueResult<NotifyMessageTemplate>();
        }

        /// <summary>
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public IList<NotifyMessageTemplate> GetAll(int pageIndex, int pageSize, out int total)
        {
            total =
                DetachedCriteria.For<NotifyMessageTemplate>()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<int>();
            return DetachedCriteria.For<NotifyMessageTemplate>()
                .AddOrder(Order.Desc(Projections.Property<NotifyMessageTemplate>(s => s.ModifyTime)))
                .SetMaxResults(pageSize).SetFirstResult(pageSize * pageIndex)
                .GetExecutableCriteria(CurrentSession).List<NotifyMessageTemplate>();
        }
    }
}