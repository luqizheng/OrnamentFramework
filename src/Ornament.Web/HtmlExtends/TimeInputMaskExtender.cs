using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Qi;

// ReSharper disable CheckNamespace

namespace Ornament.Web
// ReSharper restore CheckNamespace
{
    public static class TimeInputMaskExtender
    {
        public static IHtmlString TimeInputFor<TModel>(this HtmlHelper<TModel> helper,
                                                       Expression<Func<TModel, Time>> expression)
        {
            return TimeInputHelper(helper,
                                   ModelMetadata.FromLambdaExpression(expression, helper.ViewData),
                                   ExpressionHelper.GetExpressionText(expression), null
                );
        }

        public static MvcHtmlString TimeInputFor(this HtmlHelper helper, Time date, string name, object attris)
        {
            return TimeInputHelper(helper, null, name, new RouteValueDictionary(attris));
        }

        [SuppressMessage("Microsoft.Usage", "CA2208:InstantiateArgumentExceptionsCorrectly",
            Justification = "If this fails, it is because the string-based version had an empty 'name' parameter")]
        private static MvcHtmlString TimeInputHelper(HtmlHelper htmlHelper, ModelMetadata modelMetadata, string name,
                                                     IDictionary<string, object> htmlAttributes)
        {
            string fullName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
            if (String.IsNullOrEmpty(fullName))
            {
                throw new ArgumentException("it's empty", "name");
            }


            // If there are any errors for a named field, we add the CSS attribute.
            ModelState modelState;
            htmlHelper.ViewData.ModelState.TryGetValue(fullName, out modelState);
            Time value;
            if (modelState != null && modelState.Value != null)
            {
                var dateTimeOfrTime =
                    (DateTime) modelState.Value.ConvertTo(typeof (DateTime), CultureInfo.CurrentUICulture);
                value = new Time(dateTimeOfrTime.Hour, dateTimeOfrTime.Minute, dateTimeOfrTime.Second);
            }
            else if (modelMetadata.Model != null)
            {
                value = (Time) modelMetadata.Model;
            }
            else
            {
                value = new Time(0, 0, 0, 0);
            }

            const string format = "HH:mm:ss";
            var input = new TagBuilder("input");
            input.Attributes.Add("type", "text");
            input.Attributes.Add("name", name);
            input.Attributes.Add("inputMask-format", HtmlExtender.ToInputMask(format));
            input.Attributes.Add("value", value.ToString(format));


            var div = new TagBuilder("div");
            div.AddCssClass("input-append");
            if (htmlAttributes != null)
            {
                div.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }
            div.InnerHtml = input + "<span class=\"add-on\"><i class=\"icon-time\"></i></span>";
            return new MvcHtmlString(div.ToString());
        }
    }
}