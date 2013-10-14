using System;
using System.Configuration;
using System.IO;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;
using Ornament.Web.HtmlExtends.Boxes;

namespace Ornament.Web.HtmlExtends
{
    public static class TemplateHelper
    {
        public static Box Box(this HtmlHelper htmlHelper)
        {
            var tagBuilder = new TagBuilder("div");
            tagBuilder.AddCssClass("widget");
            htmlHelper.ViewContext.Writer.Write(tagBuilder.ToString(TagRenderMode.StartTag));

            return new Box(htmlHelper.ViewContext);
        }

        public static MvcHtmlString BoxHeader(this HtmlHelper htmlHelper, Func<object, HelperResult> action)
        {
            TextWriter writer = htmlHelper.ViewContext.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return htmlHelper.Partial(PartialViewPath("BoxHeader"), buffer.Builder);
        }

        public static MvcHtmlString BoxBody(this HtmlHelper htmlHelper, Func<object, HelperResult> action)
        {
            TextWriter writer = htmlHelper.ViewContext.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return htmlHelper.Partial(PartialViewPath("BoxBody"), buffer.Builder);
        }

        private static string PartialViewPath(string viewType)
        {
            string _template = ConfigurationManager.AppSettings["UiTemplate"] ?? "pannonia";
            return string.Format("/Views/Shared/DisplayTemplates/{0}/{1}", _template, viewType + ".cshtml");
        }
    }
}