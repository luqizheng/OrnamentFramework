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
    public class MessageTemplateDao : DaoBase<string, MessageTemplate>, IMessageTemplateDao
    {
        /// <summary>
        /// </summary>
        /// <param name="messageTemplate"></param>
        public override void Delete(MessageTemplate messageTemplate)
        {
            if (!messageTemplate.Inside)
            {
                base.Delete(messageTemplate);
                return;
            }

            throw new ArgumentException("simple message factory is inside template, it should not be deleted.");
        }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public MessageTemplate GetByName(string name)
        {
            return DetachedCriteria.For<MessageTemplate>()
                                   .Add(
                                       Restrictions.Eq(
                                           Projections.Property<MessageTemplate>(s => s.Name), name).IgnoreCase())
                                   .GetExecutableCriteria(CurrentSession).UniqueResult<MessageTemplate>();
        }

        /// <summary>
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public IList<MessageTemplate> GetAll(int pageIndex, int pageSize, out int total)
        {
            total =
                DetachedCriteria.For<MessageTemplate>()
                                .SetProjection(Projections.RowCount())
                                .GetExecutableCriteria(CurrentSession)
                                .UniqueResult<int>();
            return DetachedCriteria.For<MessageTemplate>()
                .AddOrder(Order.Desc(Projections.Property<MessageTemplate>(s => s.Inside)))
                .AddOrder(Order.Desc(Projections.Property<MessageTemplate>(s => s.ModifyTime)))
                .SetMaxResults(pageSize).SetFirstResult(pageSize * pageIndex)
                .GetExecutableCriteria(CurrentSession).List<MessageTemplate>();
        }
    }
}