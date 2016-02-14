using System;
using System.Linq;
using NHibernate;
using NHibernate.Linq;
using Ornament.Domain.Entities;
using Ornament.Domain.Stores;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate
{
    public abstract class Store<T, TId> : IDisposable, IStore<T, TId>
        where T : EntityWithTypedId<TId>

    {
        private bool _disposed;

        protected Store(IUnitOfWork context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            ShouldDisposeSession = true;
            Uow = (NhSessionUnitOfWork) context;
        }

        protected NhSessionUnitOfWork Uow { get; }

        protected ISession Context => Uow.Session;

        /// <summary>
        ///     If true then disposing this object will also dispose (close) the session. False means that external code is
        ///     responsible for disposing the session.
        /// </summary>
        public bool ShouldDisposeSession { get; set; }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IQueryable<T> Entities => this.Context.Query<T>();

        public void SaveOrUpdate(T t)
        {
            Context.SaveOrUpdate(t);
        }

        public void Delete(T t)
        {
             Context.Delete(t);
        }

        public T Get(TId id)
        {
            return this.Context.Get<T>(id);
        }

        public T Load(TId id)
        {
            return Context.Load<T>(id);
        }

        protected void ThrowIfDisposed()
        {
            if (_disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            //if (disposing && Context != null && ShouldDisposeSession)
            //{
            //}
            _disposed = true;
        }
    }
}