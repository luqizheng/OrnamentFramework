using System;
using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    //http://www.devcurry.com/2012/06/aspnet-mvc-handling-exceptions-and-404.html#.Uhy4qRudGog
    public class HttpErrorsController : Controller
    {
        public ActionResult NotFound()
        {
            Response.StatusCode = 404;
            Response.TrySkipIisCustomErrors = true;
            return View("404");
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult AjaxError(AjaxError ex)
        {
            return View(ex);
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult AjaxPageError(string text)
        {
            const string result =
                @"<div id=""ajaxerror"" class=""modal hide fade"" tabindex=""-1"" role=""dialog"" aria-labelledby=""myModalLabel"" aria-hidden=""true"">
    <div class=""modal-header"">
        <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
        <h3 role=""title"">page requirest host</h3>
    </div>
    <div class=""modal-body"">
        <p role=""content"">
           {0}
        </p>
    </div>
    <div class=""modal-footer"">
        <button class=""btn"" data-dismiss=""modal"" aria-hidden=""true"">OK</button>
    </div>
</div>";
            return Content(String.Format(result, text));
        }
    }

    public class AjaxError
    {
        public string ExceptionMessage { get; set; }

        public string ExceptionType { get; set; }

        public string Message { get; set; }

        [AllowHtml]
        public string StackTrace { get; set; }
    }
}