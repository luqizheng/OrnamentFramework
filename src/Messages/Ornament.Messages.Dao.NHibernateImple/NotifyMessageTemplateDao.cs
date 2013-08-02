using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    /// <summary>
    /// 
    /// </summary>
    internal class NotifyMessageTemplateDao : DaoBase<string, NotifyMessageTemplate>, IMessageTemplateDao
    {
        /// <summary>
        /// </summary>
        /// <param name="notifyMessageTemplate"></param>
        public override void Delete(NotifyMessageTemplate notifyMessageTemplate)
        {
            if (!notifyMessageTemplate.Inside)
            {
                base.Delete(notifyMessageTemplate);
                return;
            }

            throw new ArgumentException("simple message factory is inside template, it should not be deleted.");
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
                .AddOrder(Order.Desc(Projections.Property<NotifyMessageTemplate>(s => s.Inside)))
                .AddOrder(Order.Desc(Projections.Property<NotifyMessageTemplate>(s => s.ModifyTime)))
                .SetMaxResults(pageSize).SetFirstResult(pageSize * pageIndex)
                .GetExecutableCriteria(CurrentSession).List<NotifyMessageTemplate>();
        }
    }
}