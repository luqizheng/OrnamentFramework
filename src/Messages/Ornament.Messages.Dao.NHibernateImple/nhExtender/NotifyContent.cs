using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHibernate.Event.Default;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Templates;

namespace Ornament.Messages.Dao.NHibernateImple.nhExtender
{
    public class NotifyContentEvent : DefaultLoadEventListener
    {
        protected override object ProxyOrLoad(NHibernate.Event.LoadEvent @event, NHibernate.Persister.Entity.IEntityPersister persister, NHibernate.Engine.EntityKey keyToLoad, NHibernate.Event.LoadType options)
        {
            return base.ProxyOrLoad(@event, persister, keyToLoad, options);
        }


    }
}
