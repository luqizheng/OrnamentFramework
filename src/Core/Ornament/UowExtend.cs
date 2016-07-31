using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament
{
    public static class UowExtend
    {
        public static IUnitOfWorkFactoryBuilder AddUintOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWorkProvider>(i => new UnitOfWorkProvider(i));

            var instance = new UnitOfWorkProviderBuilder(services);
            services.AddSingleton(instance);
            return instance;
        }
    }
}