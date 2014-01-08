using System;
using System.Linq.Expressions;
using System.Web.Mvc;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class MembershipsExtensions
    {
        private const string MemberShips = "Memberships";

        public static MvcHtmlString EditorForUsers<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.EditorFor(func, "User[]");
        }

        public static MvcHtmlString EditorForRoles<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.EditorFor(func, "~/protableAreas/" + MemberShips + "/Role[]");
        }

        public static MvcHtmlString EditorForUserGroups<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.EditorFor(func, "~/protableAreas/" + MemberShips + "/UserGroup[]");
        }


        public static MvcHtmlString EditorForOrg<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func)
        {
            return helper.EditorFor(func, "~/protableAreas/" + MemberShips + "/Org");
        }

        private static MvcHtmlString EditorFor<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> func, string template)
        {
            return helper.EditorFor(func, string.Format("~/protableAreas/{0}/{1}", MemberShips, template));
        }
    }
}