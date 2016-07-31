using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public class UnitOfWorkProviderBuilder : IUnitOfWorkFactoryBuilder
    {
        private readonly Dictionary<string, IUnitOfWorkFactory> _pools
            = new Dictionary<string, IUnitOfWorkFactory>();

        public UnitOfWorkProviderBuilder(IServiceCollection services)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            Services = services;
        }

        public IServiceCollection Services { get; }

        public IUnitOfWorkFactoryBuilder Add(IUnitOfWorkFactory unitFactory)
        {
            if (unitFactory == null)
                throw new ArgumentNullException(nameof(unitFactory));
            _pools.Add(unitFactory.Name, unitFactory);
            return this;
        }

        public IUnitOfWorkFactory Get(string name)
        {
            if (_pools.ContainsKey(name))
            {
                return _pools[name];
            }
            throw new ArgumentOutOfRangeException(nameof(name));
        }

        public IUnitOfWorkFactory Get()
        {
            var firtName = _pools.Keys.First();
            return Get(firtName);
        }
    }
}