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

            });
        }

        public static MvcHtmlString Pages(this HtmlHelper helper)
        {
            return helper.Partial("Pagination", new PageClient
            {
                WidgetId = Guid.NewGuid().ToString("N"),
            });
        }

        public class PageClient
        {
            public string WidgetId { get; set; }


        }
    }
}