using System;
using System.IO;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;

namespace Ornament.Web.UI.Theme
{
    public class Panel : IDisposable
    {
        private readonly TagBuilder _builder;
        private readonly ViewContext _context;
        private readonly HtmlHelper _helper;
        private readonly string _templateName;

        public Panel(HtmlHelper helper, string templateName, params string[] classNames)
        {
            _helper = helper;
            _templateName = templateName;
            ViewContext context = helper.ViewContext;
            _builder = new TagBuilder("div");
            if (classNames == null || classNames.Length == 0)
            {
                classNames = new[] { "widget" };
            }
            var includeWidget = false;
            foreach (var cls in classNames)
            {
                if (cls == "widget")
                {
                    includeWidget = true;
                }
                _builder.AddCssClass(cls);
            }
            if (!includeWidget)
            {
                _builder.AddCssClass("widget");
            }
            context.Writer.Write(_builder.ToString(TagRenderMode.StartTag));
            _context = context;
        }

        public void Dispose()
        {
            _context.Writer.Write(_builder.ToString(TagRenderMode.EndTag));
        }

        public MvcHtmlString Header(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("Header"), buffer.Builder);
        }

        public MvcHtmlString Body(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("Body"), buffer.Builder);
        }

        public MvcHtmlString Footer(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("Footer"), buffer.Builder);
        }

        /// <summary>
        /// </summary>
        /// <param name="viewType"></param>
        /// <returns></returns>
        private string PartialViewPath(string viewType)
        {
            var a = string.Format("~/Views/Shared/DisplayTemplates/{0}/{2}/{1}", _templateName, viewType + ".cshtml", "Panel"); return a;
        }
    }
}