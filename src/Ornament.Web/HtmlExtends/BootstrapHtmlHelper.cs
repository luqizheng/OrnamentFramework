using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace Ornament.Web.HtmlExtends
{
    public static class BootstrapHtmlHelper
    {
        public static MvcHtmlString BootstrapLabelTextBoxFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
                                                          Expression<Func<TModel, TValue>> expression)
        {
            /*div class="control-group">
            @Html.LabelFor(s => s.Email, new { @class = "control-label" })
            <div class="controls">
                @Html.TextBoxFor(s => s.Email)
                @Html.ValidationMessageFor(s => s.Email)
            </div>
        </div>*/
            var result = new TagBuilder("div");
            result.AddCssClass("control-group");

            var controls = new TagBuilder("div");
            controls.AddCssClass("controls");
            controls.InnerHtml = (htmlHelper.TextBoxFor(expression).ToHtmlString()) +
                                 htmlHelper.ValidationMessageFor(expression).ToHtmlString();

            result.InnerHtml =
                htmlHelper.LabelFor(expression, new { @class = "control-label" }).ToHtmlString() + controls.ToString();


            return new MvcHtmlString(result.ToString());
        }

        public static MvcHtmlString BootstrapLabelTextBoxFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
                                                         Expression<Func<TModel, TValue>> expression, object labelAttrs, object inputAttrs)
        {
            /*div class="control-group">
            @Html.LabelFor(s => s.Email, new { @class = "control-label" })
            <div class="controls">
                @Html.TextBoxFor(s => s.Email)
                @Html.ValidationMessageFor(s => s.Email)
            </div>
        </div>*/
            var result = new TagBuilder("div");
            result.AddCssClass("control-group");

            var controls = new TagBuilder("div");
            controls.AddCssClass("controls");
            controls.InnerHtml = (htmlHelper.TextBoxFor(expression, inputAttrs).ToHtmlString()) +
                                 htmlHelper.ValidationMessageFor(expression).ToHtmlString();

            var labelAttr = new RouteValueDictionary(labelAttrs) {{"class", "control-label"}};

            result.InnerHtml = htmlHelper.LabelFor(expression, labelAttr).ToHtmlString() + controls.ToString();


            return new MvcHtmlString(result.ToString());
        }

        public static MvcHtmlString BootstrapLabelTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
                                                        Expression<Func<TModel, TValue>> expression)
        {
            /*div class="control-group">
            @Html.LabelFor(s => s.Email, new { @class = "control-label" })
            <div class="controls">
                @Html.TextBoxFor(s => s.Email)
                @Html.ValidationMessageFor(s => s.Email)
            </div>
        </div>*/
            var result = new TagBuilder("div");
            result.AddCssClass("control-group");

            var controls = new TagBuilder("div");
            controls.AddCssClass("controls");
            controls.InnerHtml = (htmlHelper.TextAreaFor(expression).ToHtmlString()) +
                                 htmlHelper.ValidationMessageFor(expression).ToHtmlString();

            result.InnerHtml =
                htmlHelper.LabelFor(expression, new { @class = "control-label" }).ToHtmlString() + controls.ToString();


            return new MvcHtmlString(result.ToString());
        }

        public static MvcHtmlString BootstrapLabelTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
                                                       Expression<Func<TModel, TValue>> expression, object httpAtts)
        {
            /*div class="control-group">
            @Html.LabelFor(s => s.Email, new { @class = "control-label" })
            <div class="controls">
                @Html.TextBoxFor(s => s.Email)
                @Html.ValidationMessageFor(s => s.Email)
            </div>
        </div>*/
            var result = new TagBuilder("div");
            result.AddCssClass("control-group");

            var controls = new TagBuilder("div");
            controls.AddCssClass("controls");
            controls.InnerHtml = (htmlHelper.TextAreaFor(expression, httpAtts).ToHtmlString()) +
                                 htmlHelper.ValidationMessageFor(expression).ToHtmlString();

            result.InnerHtml =
                htmlHelper.LabelFor(expression, new { @class = "control-label" }).ToHtmlString() + controls.ToString();


            return new MvcHtmlString(result.ToString());
        }

        public static MvcHtmlString AlertMessage(this HtmlHelper helper, string message, bool show, object htmlAttributes)
        {
            /*
            <div class="alert widget">
		    		<button data-dismiss="alert" class="close" type="button">×</button>
		    		This page contains all UI elements, including bootstrap components and custom elements
		    	</div>*/
            var tag = new TagBuilder("div");
            tag.AddCssClass("alert");
            tag.AddCssClass("widget");
            if (!show)
            {
                tag.AddCssClass("hide");
            }
            tag.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            tag.SetInnerText(message);
            return new MvcHtmlString(tag.ToString());
        }
    }
}