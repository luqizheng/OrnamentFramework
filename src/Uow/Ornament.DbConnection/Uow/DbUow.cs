using System.Data;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUow : IUnitOfWork
    {
        private readonly IDbConnection _connection;
        private readonly bool _isTranscation;
        private IDbTransaction _dbTransaction;
        private bool _selfClose = false;
        public DbUow(IDbConnection connection, bool isTranscation)
        {
            _connection = connection;
            _isTranscation = isTranscation;
        }

        public IsolationLevel? IsolationLevel { get; set; }

        public bool HadBegun => _connection.State == ConnectionState.Open;

        public void Dispose()
        {
            if (_connection.State != ConnectionState.Closed && _selfClose)
                _connection.Close();
        }

        public void Begin()
        {
            if (!HadBegun)
            {
                _selfClose = true;
                _connection.Open();
                if (!_isTranscation) return;
                _dbTransaction = IsolationLevel != null
                    ? _connection.BeginTransaction(IsolationLevel.Value)
                    : _connection.BeginTransaction();
            }
        }

        public IDbConnection Connection => _connection;

        public IDbTransaction DbTransaction => _dbTransaction;

        public void Rollback()
        {
            _dbTransaction?.Rollback();
        }

        public void Commit()
        {
            _dbTransaction?.Commit();
        }

        public void Close()
        {
            _connection.Close();
        }
    }
}