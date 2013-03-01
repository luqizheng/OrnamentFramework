using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.MicroKernel.Registration;

namespace Ornament.Messages.Dao.NHibernateImple.AppStart
{
    class DaoRegistry:Ornament.AppStart.IInitialization
    {
        public void OnStart(Context context)
        {
            context.Container.Register(
               Component.For<IDaoFactory>().ImplementedBy<MessageDaoFactory>());
        }
    }
}
