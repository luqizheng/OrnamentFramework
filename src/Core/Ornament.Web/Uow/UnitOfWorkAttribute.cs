using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.Web.Uow
{
    public class UnitOfWorkAttribute : ActionFilterAttribute
    {
        private readonly string _name;

        public UnitOfWorkAttribute():this("default")
        {
        }

        public UnitOfWorkAttribute(string name)
        {
            if (name == null) throw new ArgumentNullException(nameof(name));
            _name = name;
        }

        public IUnitOfWork GetUnitOfWork(IServiceProvider context)
        {
            var provider = ActivatorUtilities.GetServiceOrCreateInstance<IUnitOfWork>(context);
            return provider;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            GetUnitOfWork(context.HttpContext.RequestServices).Begin();
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