using System;
using System.Collections.Concurrent;
using System.Linq;

namespace Ornament.Domain.Uow
{
    
    public class UnitOfWorkProvider : IUnitOfWorkProvider
    {
        private readonly IServiceProvider _provider;

        private readonly ConcurrentDictionary<string, IUnitOfWork> _unitOfWorks = new
            ConcurrentDictionary<string, IUnitOfWork>();

        public UnitOfWorkProvider(IServiceProvider provider)
        {
            if (provider == null) throw new ArgumentNullException(nameof(provider));
            _provider = provider;
        }

        public IUnitOfWork Get(string name)
        {
            if (!_unitOfWorks.ContainsKey(name))
            {
                var builder = (IUnitOfWorkFactoryBuilder)_provider.GetService(typeof(IUnitOfWorkFactoryBuilder));
                var item = builder.Get(name).Create();
                _unitOfWorks.TryAdd(name, item);
            }
            return _unitOfWorks[name];
        }

        public IUnitOfWork Get()
        {
            if (_unitOfWorks.Count == 0)
            {
                var builder = (IUnitOfWorkFactoryBuilder)_provider.GetService(typeof(IUnitOfWorkFactoryBuilder));
                var itemFactory = builder.Get();
                var item = itemFactory.Create();
                _unitOfWorks.TryAdd(itemFactory.Name, item);
            }
            return _unitOfWorks.Values.First();
        }
    }
}