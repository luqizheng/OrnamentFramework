using System.Collections.Generic;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkProvider
    {
        IUnitOfWork Get();

        
    }
}