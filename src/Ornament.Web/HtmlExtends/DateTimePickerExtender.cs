using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

// ReSharper disable CheckNamespace
namespace Ornament.Web
// ReSharper restore CheckNamespace
{
    public static class DateTimePickerExtender
    {
        public static IHtmlString DatePickerFor<TModel>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, DateTime>> expression, string format)
        {
            ModelMetadata modelMetadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            string name = ExpressionHelper.GetExpressionText(expression);
            string fullName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
            if (String.IsNullOrEmpty(fullName))
            {
                throw new ArgumentException("it's empty", "name");
            }


            // If there are any errors for a named field, we add the CSS attribute.
            ModelState modelState;
            htmlHelper.ViewData.ModelState.TryGetValue(fullName, out modelState);
            DateTime value;
            if (modelState != null && modelState.Value != null)
            {
                value = (DateTime)modelState.Value.ConvertTo(typeof(DateTime), CultureInfo.CurrentUICulture);
            }
            else if (modelState != null && modelMetadata.Model != null)
            {
                value = (DateTime)modelMetadata.Model;
            }
            else
            {
                value = DateTime.MinValue;
            }
            return DatePickerHelper(htmlHelper, value, name, null, format);
        }

        public static MvcHtmlString DatePicker(this HtmlHelper helper, DateTime date, string format, string name, object attris)
        {
            return DatePickerHelper(helper, date, name, new RouteValueDictionary(attris), format);
        }

        [SuppressMessage("Microsoft.Usage", "CA2208:InstantiateArgumentExceptionsCorrectly",
            Justification = "If this fails, it is because the string-based version had an empty 'name' parameter")]
        private static MvcHtmlString DatePickerHelper(HtmlHelper htmlHelper, DateTime date, string name,
                                                      IDictionary<string, object> htmlAttributes, string format)
        {
           

            var input = new TagBuilder("input");
            input.Attributes.Add("type", "text");
            input.Attributes.Add("name", name);
            input.Attributes.Add("inputMask-format", HtmlExtender.ToInputMask(format));

            input.Attributes.Add("value", date.ToString(format));


            var div = new TagBuilder("div");
            div.AddCssClass("input-append");
            div.AddCssClass("date");

            div.Attributes.Add("data-date", date.ToString(format)); //for datePicker
            div.Attributes.Add("data-date-format", format.ToLower()); // for datePicker

            if (htmlAttributes != null)
            {
                input.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }
            div.InnerHtml = input + "<span class=\"add-on\"><i class=\"icon-calendar\"></i></span>";
            return new MvcHtmlString(div.ToString());
        }
    }
}
