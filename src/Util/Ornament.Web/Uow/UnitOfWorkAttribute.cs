using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;
using System;
using System.CodeDom;

namespace Ornament.Web.Uow
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class UnitOfWorkAttribute : ActionFilterAttribute

    {
        public UnitOfWorkAttribute()
        {
        }

        public IUnitOfWork UnitOfWork(IServiceProvider context)
        {
            return ActivatorUtilities.GetServiceOrCreateInstance<IUnitOfWork>(context);
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            UnitOfWork(context.HttpContext.RequestServices).Begin();
            base.OnActionExecuting(context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            base.OnResultExecuted(context);

            try
            {
                UnitOfWork(context.HttpContext.RequestServices).Commit();
            }
            finally
            {
                UnitOfWork(context.HttpContext.RequestServices).Close();
            }
        }
    }
}