using System;
using System.Threading;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.Web.Uow
{
    public class UnitOfWorkAttribute : ActionFilterAttribute

    {
        public IUnitOfWork GetUnitOfWork(IServiceProvider context)
        {
            return ActivatorUtilities.GetServiceOrCreateInstance<IUnitOfWork>(context);
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