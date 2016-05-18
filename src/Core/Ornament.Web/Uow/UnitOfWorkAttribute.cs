using System;
using Microsoft.AspNet.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.Web.Uow
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
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