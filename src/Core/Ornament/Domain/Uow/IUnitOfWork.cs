using System;

namespace Ornament.Domain.Uow
{
    public interface IUnitOfWork : IDisposable
    {
        void Begin();

        void Rollback();


        void Commit();

        void Close();
    }
}