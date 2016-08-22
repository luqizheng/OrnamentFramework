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
        Type _uowType = null;
        public UnitOfWorkAttribute(Type uowType)
        {
            _uowType = uowType;
        }
        public UnitOfWorkAttribute()
        {

        }
        /// <summary>
        ///     Gets the unit of work.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>IUnitOfWork.</returns>
        public IUnitOfWork GetUnitOfWork(IServiceProvider context)
        {
            if (_uowType == null)
                return context.GetService<IUnitOfWork>();
            return (IUnitOfWork)context.GetService(_uowType);
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
                if (context.Exception != null)
                {
                    uow.Rollback();
                }
                else
                {
                    uow.Commit();
                }
            }
            finally
            {
                uow.Close();
            }
            base.OnResultExecuted(context);
        }


    }
}