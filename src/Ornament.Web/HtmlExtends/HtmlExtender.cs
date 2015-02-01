using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class HtmlExtender
    {
        public static MvcHtmlString PartialFor<TModel, TProperty>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TProperty>> expression,
            string partialViewName)
        {
            string name = ExpressionHelper.GetExpressionText(expression);
            object model = ModelMetadata.FromLambdaExpression(expression, helper.ViewData).Model;
            var viewData = new ViewDataDictionary(helper.ViewData)
            {
                TemplateInfo = new TemplateInfo
                {
                    HtmlFieldPrefix = name
                }
            };

            return helper.Partial(partialViewName, model, viewData);
        }


        public static MvcHtmlString DescriptionFor<TModel, TValue>(this HtmlHelper<TModel> self,
            Expression<Func<TModel, TValue>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, self.ViewData);
            string description = metadata.Description;
            return MvcHtmlString.Create(
                !string.IsNullOrEmpty(description)
                    ? string.Format(@"<span class='help-block note'>{0}</span>", description)
                    : "");
        }
    }
}