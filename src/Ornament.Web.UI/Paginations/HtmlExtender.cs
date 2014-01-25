using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Ornament.Web.UI.Paginations
{
    public static class HtmlExtender
    {
        public static MvcHtmlString Pages(this HtmlHelper helper, string id, string opts)
        {
            return helper.Partial("Pagination", new PageClient
            {
                WidgetId = id,
                Options = opts

            });
        }

        public static MvcHtmlString Pages(this HtmlHelper helper)
        {
            return Pages(helper, Guid.NewGuid().ToString("N"), "$pageOpts");
        }
        public static MvcHtmlString Pages(this HtmlHelper helper, string id)
        {
            return Pages(helper, id, "$pageOpts");
        }

        public class PageClient
        {

            public string WidgetId { get; set; }
            public string Options { get; set; }
        }
    }
}