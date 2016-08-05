using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;

namespace Ornament.Web.Uow
{
    /// <summary>
    ///     Class UnitOfWorkAttribute.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute" />
    public class UnitOfWorkAttribute : ActionFilterAttribute
    {
        /// <summary>
        ///     Gets the unit of work.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>IUnitOfWork.</returns>
        public IUnitOfWork GetUnitOfWork(IServiceProvider context)
        {
            return context.GetService<IUnitOfWork>();
        }

        /// <summary>
        ///     Called when [action executing].
        /// </summary>
        /// <param name="context">The context.</param>
        /// <inheritdoc />
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var uow = GetUnitOfWork(context.HttpContext.RequestServices);
            if (!uow.HadBegun)
                uow.Begin();
            base.OnActionExecuting(context);
        }

        /// <summary>
        ///     Called when [result executed].
        /// </summary>
        /// <param name="context">The context.</param>
        /// <inheritdoc />
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