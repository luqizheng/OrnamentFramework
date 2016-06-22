using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            services.AddSingleton<IUnitOfWorkProvider>
                (i => uowProvider);
            return uowProvider;
        }

       
    }
}
