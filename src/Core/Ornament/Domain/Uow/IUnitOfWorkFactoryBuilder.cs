using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkFactoryBuilder
    {
        IServiceCollection Services { get; }

        IUnitOfWorkFactoryBuilder Add(IUnitOfWorkFactory unitFactory);

        IUnitOfWorkFactory Get(string name);
        string DefaultUowFactoryName { get; }
    }
}