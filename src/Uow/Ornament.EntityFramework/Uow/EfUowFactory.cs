using System;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.EntityFramework.Uow
{
    public class EfUowFactory : UnitOfWorkFactoryBase
    {
        public override IUnitOfWork Create()
        {
            throw new NotImplementedException();
        }

        public EfUowFactory(string name) : base(name)
        {
        }
    }
}