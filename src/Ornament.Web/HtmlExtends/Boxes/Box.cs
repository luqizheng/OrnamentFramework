using System;
using System.IO;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;

namespace Ornament.Web.HtmlExtends.Boxes
{
    public class Box : IDisposable
    {
        private readonly TagBuilder _builder;
        private readonly ViewContext _context;
        private readonly HtmlHelper _helper;
        private ViewContext context;

        public Box(HtmlHelper helper)
        {
            _helper = helper;
            context = helper.ViewContext;
            _builder = new TagBuilder("div");
            _builder.AddCssClass("widget");
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
            return _helper.Partial(PartialViewPath("BoxHeader"), buffer.Builder);
        }

        public MvcHtmlString Body(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("BoxHeader"), buffer.Builder);
        }

        /// <summary>
        /// </summary>
        /// <param name="viewType"></param>
        /// <returns></returns>
        private static string PartialViewPath(string viewType)
        {
            string template = OrnamentContext.Configuration.TemplateName();
            return string.Format("/Views/Shared/DisplayTemplates/{0}/{1}", template, viewType + ".cshtml");
        }
    }
}