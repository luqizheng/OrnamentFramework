using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.Web.Uow
{
    public class UnitOfWorkAttribute : ActionFilterAttribute
    {
        private readonly string _name;

        public UnitOfWorkAttribute()
        {
        }

        public UnitOfWorkAttribute(string name)
        {
            if (name == null)
                throw new ArgumentNullException(nameof(name));
            _name = name;
        }

        public IUnitOfWork GetUnitOfWork(IServiceProvider context)
        {
            var provider = context.GetService<IUnitOfWorkProvider>();
            return _name != null ? provider.Get(_name) : provider.Get();
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var uow = GetUnitOfWork(context.HttpContext.RequestServices);
            if (!uow.HadBegun)
                uow.Begin();
            base.OnActionExecuting(context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            var uow = GetUnitOfWork(context.HttpContext.RequestServices);
            try
            {
                uow.Commit();
            }
            finally
            {
                uow.Close();
            }
            base.OnResultExecuted(context);
        }
    }
}