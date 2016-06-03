using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using Ornament.Domain.Uow;

namespace Ornament.NHibernate.Uow
{
    public class NhSessionUowFactory : UnitOfWorkFactoryBase
    {
        private readonly ISessionFactory _sessionFactory;


        public NhSessionUowFactory(ISessionFactory sessionFactory, IServiceCollection services)
            : base(services)
        {
            _sessionFactory = sessionFactory;

        }

        public bool UseTransaction { get; set; }

        public override IUnitOfWork Create()
        {
            var result = new NhSessionUnitOfWork(_sessionFactory, UseTransaction);
            return result;
        }
    }
}