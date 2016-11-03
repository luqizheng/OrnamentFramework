using System.Data;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUowFactory : IUnitOfWorkFactory
    {
        private readonly IDbConnection _dbConnection;

        public DbUowFactory(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public bool UseTransaction { get; set; }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IUnitOfWork Create()
        {
            return new DbUow(_dbConnection, UseTransaction);
        }
    }
}