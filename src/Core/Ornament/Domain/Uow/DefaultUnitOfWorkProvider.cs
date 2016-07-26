using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public class DefaultUnitOfWorkProvider : IUnitOfWorkProvider
    {
        private readonly Dictionary<string, IUnitOfWorkFactory> _pools
            = new Dictionary<string, IUnitOfWorkFactory>();

        private readonly IServiceCollection _services;

        public DefaultUnitOfWorkProvider(IServiceCollection services)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            _services = services;
        }

        public void Add(IUnitOfWorkFactory unitFactory)
        {
            if (unitFactory == null)
                throw new ArgumentNullException(nameof(unitFactory));
            _pools.Add(unitFactory.Name, unitFactory);
        }

        public void Begin()
        {
            if (_pools.Count == 0)
                throw new ArgumentOutOfRangeException("Provder hasn't any UowFactory.");
            var name = _pools.Values.First().Name;
            Begin(name);
        }

        public void Begin(string name)
        {
            if (_pools.ContainsKey(name))
            {
                _services.AddScoped(i => _pools[name].Create());
            }
            throw new ArgumentOutOfRangeException(nameof(name));
        }
    }
}