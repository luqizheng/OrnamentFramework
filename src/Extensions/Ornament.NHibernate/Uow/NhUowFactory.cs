using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using Ornament.Domain.Uow;

namespace Ornament.NHibernate.Uow
{
    public class NhUowFactory : UnitOfWorkFactoryBase
    {
        private readonly ISessionFactory _sessionFactory;

        public NhUowFactory(ISessionFactory sessionFactory, IServiceCollection services)
            : base(services)
        {
            _sessionFactory = sessionFactory;
        }

        public bool OpenStateLessSession { get; set; }

        public bool UseTransaction { get; set; }

        public override IUnitOfWork Create()
        {
            var result = new NhUow(_sessionFactory, UseTransaction);
            return result;
        }
    }


}