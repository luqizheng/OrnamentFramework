using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using NHibernate.Context;
using Ornament.Domain.Uow;
using System;

namespace Ornament.NHibernate.Uow
{
    public class NhUow : IUnitOfWork
    {
        private readonly ISessionFactory _sessionFactory;
        private ISession _session;
        private bool _disposed = false;
        private readonly bool _useTransaction;

        public NhUow(ISessionFactory sessionFactory, bool useTransaction = false)
        {
            _sessionFactory = sessionFactory;
            _useTransaction = useTransaction;
        }

        public void Begin()
        {
            ThrowIfDisposed();


            if (_sessionFactory != null)
                _session = _sessionFactory.OpenSession();
            if (_useTransaction)
            {
                _session.BeginTransaction();
            }

        }

        public void Commit()
        {
            ThrowIfDisposed();
            if (_session == null)
            {
                throw new UowExcepton("Uow is not opened.");
            }
            if (_useTransaction)
            {
                _session.Transaction.Commit();
            }
            _session.Flush();
        }

        public void Rollback()
        {
            ThrowIfDisposed();
            if (_session == null)
            {
                throw new UowExcepton("Uow is not opened.");
            }
            _session.Transaction.Rollback();
        }

        public void Close()
        {
            ThrowIfDisposed();
            if (_session == null)
            {
                throw new UowExcepton("Uow is not opened.");
            }
            _session.Close();
        }

        public void Dispose()
        {
            ThrowIfDisposed();
            _disposed = true;
            if (this._session != null)
                this._session.Close();
        }

        public ISession Session
        {
            get
            {
                if (_session == null)
                {
                    throw new UowExcepton("Uow is not opened.");
                }
                return _session;
            }
        }

        protected void ThrowIfDisposed()
        {
            if (_disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
        }
    }
}