using System;
using System.Collections.Concurrent;
using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    /// <summary>
    /// Class UnitOfWorkProvider.
    /// </summary>
    /// <seealso cref="Ornament.Domain.Uow.IUnitOfWorkProvider" />
    public class UnitOfWorkProvider : IUnitOfWorkProvider
    {
        /// <summary>
        /// The provider
        /// </summary>
        private readonly IServiceProvider _provider;

        /// <summary>
        /// The unit of works
        /// </summary>
        private readonly ConcurrentDictionary<string, IUnitOfWork> _unitOfWorks = new
            ConcurrentDictionary<string, IUnitOfWork>();

        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWorkProvider"/> class.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public UnitOfWorkProvider(IServiceProvider provider)
        {
            if (provider == null) throw new ArgumentNullException(nameof(provider));
            _provider = provider;
        }

        /// <summary>
        /// Begin a UOW
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>IUnitOfWork.</returns>
        /// <exception cref="ArgumentNullException"></exception>
        public IUnitOfWork Get(string name)
        {
            if (name == null)
                throw new ArgumentNullException(nameof(name));
            if (!_unitOfWorks.ContainsKey(name))
            {
                var builder = (IUnitOfWorkFactoryBuilder) _provider.GetService(typeof(IUnitOfWorkFactoryBuilder));
                var item = builder.Get(name).Create();
                _unitOfWorks.TryAdd(name, item);
            }
            return _unitOfWorks[name];
        }

        /// <summary>
        /// Gets this instance.
        /// </summary>
        /// <returns>IUnitOfWork.</returns>
        public IUnitOfWork Get()
        {
            var builder = _provider.GetRequiredService<IUnitOfWorkFactoryBuilder>();

            var defaultName = builder.DefaultUowFactoryName;
            return Get(defaultName);
        }
    }
}