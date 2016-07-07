using System;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUowFactory : UnitOfWorkFactoryBase
    {
        private readonly IConnectionProvider _provider;

        public DbUowFactory(string name, IConnectionProvider provider) : base(name)
        {
            if (provider == null) throw new ArgumentNullException(nameof(provider));
            _provider = provider;
        }

        public bool UseTransaction { get; set; }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override IUnitOfWork Create()
        {
            return new DbUow(_provider, UseTransaction);
        }
    }
}