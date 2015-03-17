using System.Globalization;
using System.Threading;
using System.Web.Mvc;

namespace Ornament.Web.HttpModel
{
    public class LocalizationFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            CultureInfo lang = OrnamentContext.MemberShip.CurrentLanguage();
            Thread.CurrentThread.CurrentUICulture = lang;
            Thread.CurrentThread.CurrentCulture = lang;
            base.OnActionExecuting(filterContext);
        }
    }
}