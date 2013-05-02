using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Ornament.Web.HtmlExtends
{
    public static class BootstrapHtmlHelper
    {
        public static MvcHtmlString LabelTextBoxFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
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

        public static MvcHtmlString LabelTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
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

        public static MvcHtmlString LabelTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> htmlHelper,
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
    }
}