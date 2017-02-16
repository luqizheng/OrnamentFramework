#region Using

using System;
using System.Collections.Generic;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

#endregion

namespace WebApplication.Helpers
{
    public class Panel : IDisposable
    {
        private readonly TagBuilder _builder;
        //private readonly ViewContext _context;
        private readonly IHtmlHelper _helper;
        private readonly TagBuilder _root;
        private TagBuilder _body;
        private IHtmlContent _bodyContent;
        private TagBuilder _bodyFooter;
        private IHtmlContent _bodyToolbar;
        private TagBuilder _header;

        public Panel(IHtmlHelper helper, params string[] classNames)
            : this(helper, new PanelOption
            {
                HtmlAttributes = new Dictionary<string, object>
                {
                    {"class", string.Join(" ", classNames)}
                }
            })
        {
        }


        public Panel(IHtmlHelper helper, PanelOption options)
        {
            _helper = helper;
            var context = helper.ViewContext;
            _root = new TagBuilder("article");

            var clz = options.HtmlAttributes.ContainsKey("class")
                ? options.HtmlAttributes["class"].ToString()
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12";


            _root.AddCssClass(clz);


            _builder = new TagBuilder("div");
            _builder.AddCssClass("jarviswidget");
            options.InitPanle(_builder);
            if (options.HtmlAttributes.Count != 0)
                _builder.MergeAttributes(options.HtmlAttributes);
            _root.InnerHtml.AppendHtml(_builder);
            //context.Writer.Write(_root.ToString(TagRenderMode.StartTag));
            //context.Writer.Write(_builder.ToString(TagRenderMode.StartTag));
            //_context = context;
        }

        public void Dispose()
        {
            //_context.Writer.Write(_builder.ToString(TagRenderMode.EndTag));
            //_context.Writer.Write(_root.ToString(TagRenderMode.EndTag));
            if (_header!=null)
            {
                _body.InnerHtml.AppendHtml(_header);
            }
            if (_body != null)
            {
                if (_bodyToolbar != null)
                    _body.InnerHtml.AppendHtml(_bodyToolbar);
                _body.InnerHtml.AppendHtml(_bodyContent);
                if (_bodyFooter != null)
                    _body.InnerHtml.AppendHtml(_bodyFooter);
            }
            _root.WriteTo(_helper.ViewContext.Writer, HtmlEncoder.Default);
        }

        public void HeaderToolbar(Func<object, HelperResult> action)
        {
            var str = HtmlHelperExtensions.GetString(action(null));
            var toolbar = _helper.Partial(PartialViewPath("HeaderToolbar"), str);
            _builder.InnerHtml.AppendHtml(toolbar);

            //var buffer = new RecordWriter(writer);
            //action(null).WriteTo(buffer);
            //return _helper.Partial(PartialViewPath("HeaderToolbar"), buffer.Builder);
        }

        public void Header(Func<object, IHtmlContent> action, object htmlAttributes)
        {
            var attributes = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            _header = new TagBuilder("header");
            _header.MergeAttributes(attributes);
            _header.AddCssClass("");


            _header.InnerHtml.AppendHtml(action(null));

          
        }

        /// <summary>
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        public void Header(Func<object, IHtmlContent> action)
        {
            Header(action, new object());
        }

        public void Body(Func<object, HelperResult> action,
            object htmlAttributes)
        {
            _body = new TagBuilder("div");
            _body.AddCssClass("widget-body");
            var attributes = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            _body.MergeAttributes(attributes, true);

            _builder.InnerHtml.AppendHtml(_body);

            //body content.
            _bodyContent = action(null);
        }

        public void Body(Func<object, HelperResult> action)
        {
            Body(action, new object());
        }

        public void BodyToolBar(Func<object, HelperResult> action)
        {
            var str = HtmlHelperExtensions.GetString(action(null));
            var s = _helper.Partial(PartialViewPath("BodyToolbar"), str);
            var tag = new TagBuilder("div");
            tag.InnerHtml.AppendHtml(s);
            _body.InnerHtml.AppendHtml(tag);
        }

        public void Footer(Func<object, HelperResult> action)
        {
            var tag = new TagBuilder("div");
            tag.AddCssClass("widget-footer");

            _bodyFooter = tag;
        }

        /// <summary>
        /// </summary>
        /// <param name="viewType"></param>
        /// <returns></returns>
        private string PartialViewPath(string viewType)
        {
            return string.Format("~/Views/Shared/DisplayTemplates/{1}/{0}", viewType + ".cshtml", "Panel");
        }

        //public IHtmlContent Edit(Func<object, HelperResult> action)
        //{
        //    TextWriter writer = _context.Writer;
        //    var buffer = new RecordWriter(writer);
        //    action(null).WriteTo(buffer);
        //    return _helper.Partial(PartialViewPath("EditPlace"), buffer.Builder);

        //}
    }
}