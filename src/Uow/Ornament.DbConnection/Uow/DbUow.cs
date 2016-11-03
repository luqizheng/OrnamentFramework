using System.Data;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUow : IUnitOfWork
    {
        private readonly bool _isTranscation;
        private bool _selfClose;

        public DbUow(IDbConnection connection, bool isTranscation)
        {
            Connection = connection;
            _isTranscation = isTranscation;
        }

        public IsolationLevel? IsolationLevel { get; set; }

        public IDbConnection Connection { get; }

        public IDbTransaction DbTransaction { get; private set; }

        public bool HadBegun => Connection.State == ConnectionState.Open;

        public void Dispose()
        {
            if ((Connection.State != ConnectionState.Closed) && _selfClose)
                Connection.Close();
        }

        public void Begin()
        {
            if (!HadBegun)
            {
                _selfClose = true;
                Connection.Open();
                if (!_isTranscation) return;
                DbTransaction = IsolationLevel != null
                    ? Connection.BeginTransaction(IsolationLevel.Value)
                    : Connection.BeginTransaction();
            }
        }

        public void Rollback()
        {
            DbTransaction?.Rollback();
        }

        public void Commit()
        {
            DbTransaction?.Commit();
        }

        public void Close()
        {
            Connection.Close();
        }
    }
}