using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Ornament.Domain.Uow
{
    public abstract class UnitOfWorkFactoryBase : IUnitOfWorkFactory
    {
        public abstract IUnitOfWork Create();
    }

    public class DefaultUnitOfWorkFactoryProvider
    {
        private readonly IServiceCollection _services;

        public DefaultUnitOfWorkFactoryProvider(IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));
            _services = services;
        }

        public void Register(IUnitOfWorkFactory unitFactory)
        {
            if (unitFactory == null)
                throw new ArgumentNullException(nameof(unitFactory));
            _services.AddScoped(i => unitFactory.Create());
        }
    }
}