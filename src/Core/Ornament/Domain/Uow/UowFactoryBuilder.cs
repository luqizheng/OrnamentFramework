using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public class UowFactoryBuilder : IUnitOfWorkFactoryBuilder
    {
        private readonly Dictionary<string, IUnitOfWorkFactory> _pools
            = new Dictionary<string, IUnitOfWorkFactory>();

        public UowFactoryBuilder(IServiceCollection services)
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

        public string DefaultUowFactoryName
        {
            get
            {
                if (_pools.Count == 0)
                    throw new UowFactoryBuilderException("Builder has not any " + nameof(IUnitOfWorkFactory));
                return this._pools.Values.First().Name;
            }
        }
    }

    public class UowFactoryBuilderException:Exception
    {
        public UowFactoryBuilderException(string message)
            :base(message)
        {
            
        }
    }
}