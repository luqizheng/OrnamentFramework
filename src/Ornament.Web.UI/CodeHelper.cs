using System;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;

namespace Ornament.Web.UI
{
    public static class CodeHelper
    {
        public static MvcHtmlString Code(this HtmlHelper helper,
            Func<object, HelperResult> action)
        {
            ViewContext context = helper.ViewContext;
            var buffer = new RecordWriter(context.Writer);
            action(null).WriteTo(buffer);
            return new MvcHtmlString(HttpUtility.HtmlEncode(buffer.Builder.ToString()));
        }
    }
}