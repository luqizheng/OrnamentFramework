using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace Ornament.Web.UI
{
    /// <summary>
    /// 需要用VaForm。js配合使用
    /// </summary>
    public class ValidateAjaxAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!filterContext.HttpContext.Request.IsAjaxRequest())
                return;

            ModelStateDictionary modelState = filterContext.Controller.ViewData.ModelState;
            if (!modelState.IsValid)
            {
                var errorModel =
                    from x in modelState.Keys
                    where modelState[x].Errors.Count > 0
                    select new
                    {
                        key = x,
                        errors = modelState[x].Errors.
                            Select(y =>
                            {
                                if (String.IsNullOrEmpty(y.ErrorMessage))
                                {
                                    return y.Exception.Message;
                                }
                                return y.ErrorMessage;
                            }).
                            ToArray()
                    };
                filterContext.Result = new JsonResult
                {
                    Data = errorModel
                };
                filterContext.HttpContext.Response.StatusCode =
                    (int)HttpStatusCode.BadRequest;
            }
        }
    }
}