using NHibernate;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;
using System;

namespace Ornament.NHibernate
{
    public abstract class Store : IDisposable
    {
        private bool _disposed;

        private NhSessionUnitOfWork _Uow;

        protected Store(IUnitOfWork context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            ShouldDisposeSession = true;
            _Uow = (NhSessionUnitOfWork)context;
        }

        protected NHibernate.Uow.NhSessionUnitOfWork Uow
        {
            get
            {
                return _Uow;
            }
        }

        protected ISession Context
        {
            get
            {
                return Uow.Session;
            }
        }

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