using System;
using System.Collections.Generic;
using System.Data;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUow : IUnitOfWork
    {
        private readonly IDbConnection _connection;
        private readonly bool _isTranscation;
        private readonly IConnectionProvider _provider;
        private IDbTransaction _dbTransaction;
       
        public DbUow(IConnectionProvider provider, bool isTranscation)
        {
            _connection = provider.CreateConnection();
            _provider = provider;
            _isTranscation = isTranscation;
        }

        public IsolationLevel? IsolationLevel { get; set; }

        public void Dispose()
        {
            if (_connection.State != ConnectionState.Closed)
            {
                _connection.Close();
            }
        }

        public void Begin()
        {
            _connection.Open();
            if (!_isTranscation) return;
            if (IsolationLevel != null)
                _dbTransaction = _connection.BeginTransaction(IsolationLevel.Value);
            _dbTransaction = _connection.BeginTransaction();
        }

        public void Rollback()
        {
            _dbTransaction?.Rollback();
        }

        public void Commit()
        {
            if (_dbTransaction == null)
                return;
            _dbTransaction?.Commit();
        }

        public void Close()
        {
            _connection.Close();
        }


    }
}