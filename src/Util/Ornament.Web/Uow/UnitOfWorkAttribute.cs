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
        public IUnitOfWork GetUow(IServiceProvider context)
        {
            return ActivatorUtilities.GetServiceOrCreateInstance<IUnitOfWork>(context);
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            GetUow(context.HttpContext.RequestServices).Begin();
            base.OnActionExecuting(context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            base.OnResultExecuted(context);

            try
            {
                GetUow(context.HttpContext.RequestServices).Commit();
            }
            finally
            {
                GetUow(context.HttpContext.RequestServices).Close();
            }
        }
    }
}