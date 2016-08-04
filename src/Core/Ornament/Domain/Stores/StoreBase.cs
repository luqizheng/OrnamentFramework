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
        private bool _selfHandlerUow;
        protected StoreBase(IUnitOfWorkProvider context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            UowProvider = context;
        }

        protected IUnitOfWorkProvider UowProvider { get; }

        public IUnitOfWork Current
        {
            get
            {
                var uow = this.UowProvider.Get();
                if (!uow.HadBegun)
                {
                    _selfHandlerUow = true;
                    uow.Begin();
                }
                return uow;

            }
        }
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
            if (_selfHandlerUow)
            {
                this.Current.Commit();
                this.Current.Close();
            }
            _disposed = true;
        }
    }
}