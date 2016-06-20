using Microsoft.Extensions.DependencyInjection;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkFactory
    {
        

        IUnitOfWork Create();
    }
}