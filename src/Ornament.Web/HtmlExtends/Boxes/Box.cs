using System;
using System.Web.Mvc;

namespace Ornament.Web.HtmlExtends.Boxes
{
    public class Box : IDisposable
    {
        private readonly TagBuilder _builder;
        private readonly ViewContext _context;

        public Box(ViewContext context)
        {
            _builder = new TagBuilder("div");
            _builder.AddCssClass("widget");
            context.Writer.Write(_builder.ToString(TagRenderMode.StartTag));
            _context = context;
        }

        public void Dispose()
        {
            _context.Writer.Write(_builder.ToString(TagRenderMode.EndTag));
        }
    }
}