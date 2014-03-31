using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class MembershipsExtensions
    {
        private const string MemberShips = "Memberships";

        public static MvcHtmlString EditorForUsers<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "User[]");
        }

        public static MvcHtmlString EditorForRoles<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "Role[]");
        }

        public static MvcHtmlString EditorForUserGroups<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "UserGroup[]");
        }

        public static MvcHtmlString EditorForUser<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "User");
        }

        public static MvcHtmlString EditorForOrg<TModel, TValue>(this HtmlHelper<TModel> helper,
                Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "Org");
        }
        /// <summary>
        /// 使用MemberShip.Plugin里面的EditorTemplates，
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="helper"></param>
        /// <param name="func"></param>
        /// <param name="template"></param>
        /// <returns></returns>
        public static MvcHtmlString MemberShipEditorFor<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func, string template)
        {
            return helper.EditorFor(func, string.Format("~/{0}/{1}", MemberShips, template));
        }
    }
}