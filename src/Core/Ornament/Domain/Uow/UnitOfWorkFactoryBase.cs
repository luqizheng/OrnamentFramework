using System.Collections.Concurrent;
using System.Linq;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Ornament.Domain.Uow
{
    public abstract class UnitOfWorkFactoryBase : IUnitOfWorkFactory
    {
        protected UnitOfWorkFactoryBase(string name)
        {
            this.Name = name;
        }
        public string Name
        {
            get;
        }

        public abstract IUnitOfWork Create();


    }
}