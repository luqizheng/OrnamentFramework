using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.WebPages;

namespace Ornament.Web.UI
{
    public static class RequireJs
    {
        public static MvcHtmlString Require(this HtmlHelper helper, Func<object, HelperResult> action)
        {
            ViewContext context = helper.ViewContext;
            TextWriter writer = context.Writer;
            var buffer = new RecordWriter(writer);
            buffer.Builder.Append("require(['@Url.Content(\"~/scripts/config.js\")'], function () {");
            action(null).WriteTo(buffer);
            buffer.Builder.Append("});");
            return new MvcHtmlString(buffer.ToString());

        }
    }
}
