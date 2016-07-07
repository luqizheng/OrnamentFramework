using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament
{
    public static class UowExtend
    {
        public static IUnitOfWorkProvider DefaultUowProvider(this IServiceCollection services)
        {
            var result = new DefaultUnitOfWorkProvider(services);
            services.AddSingleton<IUnitOfWorkProvider>(i => result);
            return result;
        }

        public static IUnitOfWorkProvider UowFactoryProvider(this IServiceCollection services,
            IUnitOfWorkProvider uowProvider)
        {
            services.AddSingleton
                (i => uowProvider);
            return uowProvider;
        }
    }
}