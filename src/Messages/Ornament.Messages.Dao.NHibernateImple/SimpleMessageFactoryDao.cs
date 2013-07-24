using System;
using NHibernate;
using NHibernate.Criterion;
using Ornament.Messages.Notification;
using Qi.Domain.NHibernates;
using Qi.NHibernateExtender;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class SimpleMessageFactoryDao : DaoBase<string, MessageTemplate>, IMessageTemplateDao
    {


        public override void Delete(MessageTemplate messageTemplate)
        {
            if (!messageTemplate.Inside)
            {
                base.Delete(messageTemplate);
            }
            throw new ArgumentException("simple message factory is inside template, it should not be deleted.");
        }

        public MessageTemplate GetByName(string name)
        {
            return DetachedCriteria.For<MessageTemplate>()
                                   .Add(
                                       Restrictions.Eq(
                                           Projections.Property<MessageTemplate>(s => s.Name), name).IgnoreCase())
                                   .GetExecutableCriteria(CurrentSession).UniqueResult<MessageTemplate>();
        }


    }
}