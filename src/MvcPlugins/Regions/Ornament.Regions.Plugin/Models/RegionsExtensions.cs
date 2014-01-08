using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class RegionsExtensions
    {
        public static MvcHtmlString EditorForArea<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.EditorFor(func, "~/protableAreas/Regions/Area");
        }
    }
}