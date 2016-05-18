using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using NHibernate.Context;
using Ornament.Domain.Uow;
using System;

namespace Ornament.NHibernate.Uow
{
    public class NhSessionUnitOfWork : IUnitOfWork
    {
        private ISessionFactory _sessionFactory;
        private ISession _session;
        private bool _useTransaction;

        public NhSessionUnitOfWork(ISessionFactory sessionFactory, bool useTransaction)
        {
            _sessionFactory = sessionFactory;
            _useTransaction = useTransaction;
        }

        public void Begin()
        {
            _session = _sessionFactory.OpenSession();
            if (_useTransaction)
            {
                _session.BeginTransaction();
            }
        }

        public void Commit()
        {
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
            if (_session == null)
            {
                throw new UowExcepton("Uow is not opened.");
            }
            _session.Transaction.Rollback();
        }

        public void Close()
        {
            if (_session == null)
            {
                throw new UowExcepton("Uow is not opened.");
            }
            _session.Close();
        }

        public void Dispose()
        {
            if (this._session != null)
                this._session.Dispose();
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
    }
}