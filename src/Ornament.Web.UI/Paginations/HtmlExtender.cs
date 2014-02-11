using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Ornament.Web.UI.Paginations
{
    public static class HtmlExtender
    {
        /// <summary>
        /// 创建一个分页控件，mvvm框架是 avalon.js，模板是~/Views/Shared/Pagiantion.cshtml.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="id"></param>
        /// <param name="opts"></param>
        /// <returns></returns>
        public static MvcHtmlString Pages(this HtmlHelper helper, string id, string opts)
        {
            return helper.Partial("Pagination", new PageClient
            {
                WidgetId = id,
                Options = opts

            });
        }
        /// <summary>
        /// 创建一个分页控件，在avalon.js中他的id是Guid，options是$pageOpts
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
        public static MvcHtmlString Pages(this HtmlHelper helper)
        {
            return Pages(helper, Guid.NewGuid().ToString("N"), "$pageOpts");
        }

        /// <summary>
        /// 创建一个分页控件，options是$pageOpts
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="id">id可以指定</param>
        /// <returns></returns>
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