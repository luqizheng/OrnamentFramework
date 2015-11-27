using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using Ornament.Domain.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.NHibernate.Uow
{
    public class NhSessionUowFactory : IUnitOfWorkFactory
    {
        private ISessionFactory _sessionFactory;
        private IServiceCollection _services;

        public NhSessionUowFactory(ISessionFactory sessionFactory, IServiceCollection services)
        {
            _sessionFactory = sessionFactory;
            _services = services;
        }

        public bool UseTransaction
        {
            get; set;
        }

        public IUnitOfWork Create()
        {
            var result = new NhSessionUnitOfWork(_sessionFactory, UseTransaction);
            return result;
        }
    }
}