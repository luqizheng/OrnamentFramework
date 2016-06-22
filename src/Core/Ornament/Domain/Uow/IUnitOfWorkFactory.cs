using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkFactory
    {
        string Name { get; }

        IUnitOfWork Create();
    }
}