using System;

namespace Ornament.Domain.Uow
{
    /// <summary>
    ///     Interface IUnitOfWork
    /// </summary>
    /// <seealso cref="System.IDisposable" />
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        ///     Begins this instance.
        /// </summary>
        void Begin();

        /// <summary>
        ///     Rollbacks this instance.
        /// </summary>
        void Rollback();


        /// <summary>
        ///     Commits this instance.
        /// </summary>
        void Commit();

        /// <summary>
        ///     Closes this instance.
        /// </summary>
        void Close();
    }

    
}