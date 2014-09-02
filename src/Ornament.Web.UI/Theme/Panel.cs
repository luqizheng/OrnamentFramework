using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;

namespace Ornament.Web.UI.Theme
{
    public class PanelOption
    {
        public PanelOption()
        {
            EditButton = false;
            Collapsed = true;
        }

        public string Id { get; set; }
        public bool EditButton { get; set; }
        public bool ColorButton { get; set; }
        public bool ToggleButton { get; set; }
        public bool DeleteButton { get; set; }
        public bool FullScreenButton { get; set; }
        public bool CustomButton { get; set; }
        public bool Collapsed { get; set; }
        public bool Sortable { get; set; }

        public void InitPanle(TagBuilder div)
        {
            /*data-widget-editbutton="false">
					
					data-widget-colorbutton="false"	
					data-widget-editbutton="false"
					data-widget-togglebutton="false"
					data-widget-deletebutton="false"
					data-widget-fullscreenbutton="false"
					data-widget-custombutton="false"
					data-widget-collapsed="true" 
					data-widget-sortable="false"*/
            var direct = new Dictionary<string, string>();
            if (!EditButton)
            {
                direct.Add("data-widget-editbutton", EditButton.ToString().ToLower());
            }
            if (!ColorButton)
            {
                direct.Add("data-widget-colorbutton", ColorButton.ToString().ToLower());
            }
            if (!ToggleButton)
            {
                direct.Add("data-widget-togglebutton", ToggleButton.ToString().ToLower());
            }
            if (!DeleteButton)
            {
                direct.Add("data-widget-deletebutton", DeleteButton.ToString().ToLower());
            }
            if (!FullScreenButton)
            {
                direct.Add("data-widget-fullscreenbutton", FullScreenButton.ToString().ToLower());
            }
            if (!Collapsed)
            {
                direct.Add("data-widget-collapsed", Collapsed.ToString().ToLower());
            }

            if (Sortable)
            {
                direct.Add("data-widget-sortable", Sortable.ToString().ToLower());
            }


            div.MergeAttributes(direct);
        }
    }

    public class Panel : IDisposable
    {
        private readonly TagBuilder _builder;
        private readonly ViewContext _context;
        private readonly HtmlHelper _helper;
        private readonly TagBuilder _root;


        public Panel(HtmlHelper helper, params string[] classNames)
            : this(helper, new PanelOption(), new Dictionary<string, object>()
            {
                {"class",String.Join(" ",classNames)}
            })
        {
        }

        public Panel(HtmlHelper helper, PanelOption options, IDictionary<string, object> htmlAttributes)
        {
            _helper = helper;
            ViewContext context = helper.ViewContext;
            _root = new TagBuilder("article");

            string clz = htmlAttributes.ContainsKey("class")
                ? htmlAttributes["class"].ToString()
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12";


            _root.AddCssClass(clz);


            _builder = new TagBuilder("div");
            _builder.AddCssClass("jarviswidget");
            options.InitPanle(_builder);
            if (htmlAttributes.Count != 0)
            {
                _builder.MergeAttributes(htmlAttributes);

            }
            context.Writer.Write(_root.ToString(TagRenderMode.StartTag));
            context.Writer.Write(_builder.ToString(TagRenderMode.StartTag));
            _context = context;
        }

        public void Dispose()
        {
            _context.Writer.Write(_builder.ToString(TagRenderMode.EndTag));
            _context.Writer.Write(_root.ToString(TagRenderMode.EndTag));
        }

        public MvcHtmlString HeaderToolbar(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("HeaderToolbar"), buffer.Builder);
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
            return string.Format("~/Views/Shared/DisplayTemplates/{1}/{0}", viewType + ".cshtml", "Panel");
        }

        public MvcHtmlString Edit(Func<object, HelperResult> action)
        {
            TextWriter writer = _context.Writer;
            var buffer = new RecordWriter(writer);
            action(null).WriteTo(buffer);
            return _helper.Partial(PartialViewPath("EditPlace"), buffer.Builder);
        }
    }
}