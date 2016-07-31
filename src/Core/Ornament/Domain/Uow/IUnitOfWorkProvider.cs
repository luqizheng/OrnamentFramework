using System.Collections.Generic;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkProvider
    {
        /// <summary>
        ///     Begin a UOW
        /// </summary>
        /// <param name="name"></param>
        IUnitOfWork Get(string name);

        IUnitOfWork Get();
    }
}