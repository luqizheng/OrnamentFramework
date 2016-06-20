using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Ornament.Domain.Uow;

namespace Ornament.EntityFramework.Uow
{
    public class EfUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;
        private readonly bool _enabledTranscation;
        private IDbContextTransaction _transaction;

        public EfUnitOfWork(DbContext dbContext, bool enabledTranscation)
        {
            _dbContext = dbContext;
            _enabledTranscation = enabledTranscation;
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public void Begin()
        {
            if (_enabledTranscation)
                _transaction = _dbContext.Database.BeginTransaction();
        }

        public void Rollback()
        {
            if (_enabledTranscation)
                _transaction.Rollback();
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
            if (_enabledTranscation)
                _transaction.Commit();
        }

        public void Close()
        {
            _dbContext.Dispose();
        }

        public DbContext DbContext => _dbContext;
    }
}