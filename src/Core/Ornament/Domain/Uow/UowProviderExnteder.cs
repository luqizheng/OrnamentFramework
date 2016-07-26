using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public static class UowProviderExnteder
    {
        public static IUnitOfWorkProvider AddUnitOfWorkProvider(this IServiceCollection services)
        {
            var instance = new DefaultUnitOfWorkProvider(services);
            return instance;
        }
    }
}
