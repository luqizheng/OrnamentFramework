using System;
using System.Linq;
using Ornament.Domain.Entities;
using Ornament.Domain.Uow;

namespace Ornament.Domain.Stores
{
    public abstract class StoreBase<T, TId> : IStore<T, TId>
        where T : EntityWithTypedId<TId>
        where TId : IEquatable<TId>
    {
        private bool _disposed;

        protected StoreBase(IUnitOfWorkProvider context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));
            Uow = context;
        }

        public IUnitOfWorkProvider Uow { get; }

        public abstract IQueryable<T> Entities { get; }

        public abstract void SaveOrUpdate(T t);

        public abstract void Delete(T t);


        public abstract T Get(TId id);

        public abstract T Load(TId id);

        protected void ThrowIfDisposed()
        {
            if (_disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            _disposed = true;
        }
    }
}