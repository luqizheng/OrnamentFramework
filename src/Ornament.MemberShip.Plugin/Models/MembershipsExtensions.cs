using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class MembershipsExtensions
    {
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

        public static MvcHtmlString EditorForOrgTree<TModel, TValue>(this HtmlHelper<TModel> helper,
                Expression<Func<TModel, TValue>> func)
        {
            return helper.MemberShipEditorFor(func, "OrgTree");
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
            return helper.EditorFor(func, CreateEditorTemplates(template));
        }

        public static string CreateEditorTemplates(string uiName)
        {
            return string.Format("~/Areas/MemberShips/Areas/MemberShips/Views/Shared/EditorTemplates/{0}", uiName);
        }
    }
}