using System;
using System.Configuration;
using System.Globalization;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Security;
using Castle.MicroKernel.Registration;
using Microsoft.Ajax.Utilities;
using Ornament.Contexts;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Permissions;
using Ornament.Web;
using Ornament.Web.HttpModel;

// ReSharper disable CheckNamespace

namespace Ornament
// ReSharper restore CheckNamespace
{
    /// <summary>
    /// </summary>
    public static class WebOrnamentContextExtender
    {
        private const string langCookieName = "lang";
        public static readonly string VerifyCodeKey = "VerifyCode";
       

        /// <summary>
        /// </summary>
        static WebOrnamentContextExtender()
        {
            OrnamentContext.IocContainer
                .Register(
                    Component.For<ResourceDescriptionManager>().Instance(new ResourceDescriptionManager()));
        }

        /// <summary>
        ///     gets the TemplateName of setting.
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        public static string TemplateName(this OrnamentConfiguration config)
        {
            return ConfigurationManager.AppSettings["UITemplate"] ?? "pannonia";
        }

        public static string CurrentVerifyCode(this MemberShipContext context)
        {
            return HttpContext.Current.Session[VerifyCodeKey] as string;
        }

        /// <summary>
        /// </summary>
        public static ResourceDescriptionManager Configuration(this ResourceManager manager)
        {
            return OrnamentContext.IocContainer.Resolve<ResourceDescriptionManager>();
        }

        /// <summary>
        /// </summary>
        public static User CurrentUser(this MemberShipContext context)
        {
            if (HttpContext.Current == null || HttpContext.Current.User == null ||
                !HttpContext.Current.User.Identity.IsAuthenticated)
                return null;
            IUserDao a = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao();

            User user = a.GetByLoginId(HttpContext.Current.User.Identity.Name);
            //如果最后一次访问大于设置值，那么需要更新一下LastActivitiyDate的值。
            DateTime now = DateTime.Now;
            if (user.Other.LastActivityDate == null ||
                (now - user.Other.LastActivityDate.Value).Minutes >= Membership.UserIsOnlineTimeWindow/3)
            {
                user.Other.LastActivityDate = now;
                a.SaveOrUpdate(user);
                a.Flush();
            }
            return user;
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="serverTime"></param>
        /// <returns></returns>
        public static DateTime ToClientDateTime(this MemberShipContext context, DateTime serverTime)
        {
            return serverTime.AddHours(context.OffSetHour());
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private static int OffSetHour(this MemberShipContext context)
        {
            int? clientSetting = OrnamentModule.GetOffSetHour();
            if (clientSetting == null)
                return 0;
            return clientSetting.Value;
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="clientTime"></param>
        /// <returns></returns>
        public static DateTime ToServerDateTime(this MemberShipContext context, DateTime clientTime)
        {
            return clientTime.AddHours(-context.OffSetHour());
        }

        /// <summary>
        ///     获取最终的Language
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string Language(this MemberShipContext context)
        {
            string language = context.CurrentUser() != null ? context.CurrentUser().Language : "";

            if (String.IsNullOrEmpty(language))
            {
                language = CookieLanguage(context);
            }

            if (String.IsNullOrEmpty(language))
            {
                language = BroswerLanguage(context);
            }
            
            return language;
        }

        public static string BroswerLanguage(this MemberShipContext context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request.UserLanguages != null)
            {
                return OrnamentContext.Configuration.Languages.DefaultOrMatch(HttpContext.Current.Request.UserLanguages).Key;
            }
            return OrnamentContext.Configuration.DefaultLanguage.Key;
        }

        public static string CookieLanguage(this MemberShipContext context)
        {
            HttpCookie reqCookie = HttpContext.Current.Request.Cookies[langCookieName];
            HttpCookie respCookie = HttpContext.Current.Response.Cookies[langCookieName];

            string reqValue = reqCookie != null ? reqCookie.Value : "";
            string respValue = respCookie != null ? respCookie.Value : "";

            if (String.IsNullOrEmpty(reqValue) && String.IsNullOrEmpty(respValue))
            {
                return null;
            }

            if (reqValue != respValue && !String.IsNullOrEmpty(respValue))
            {
                return respValue;
            }

            return reqValue;
        }

        /// <summary>
        ///     Switch lanugage.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="language"></param>
        public static void SwitchLanguage(this MemberShipContext context, string language)
        {
            if (!OrnamentContext.Configuration.Languages.Contains(language))
                throw new ArgumentOutOfRangeException("language", language + " do not support in this web-site.");
            if (OrnamentContext.MemberShip.CurrentUser() != null)
            {
                OrnamentContext.MemberShip.CurrentUser().Language = language;
            }
            Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(language);
            Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(language);
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.Cookies.Add(new HttpCookie(langCookieName, language));
            }
        }

      

    

        /// <summary>
        ///     后台Backend laoyout
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        public static string BackendLayout(this OrnamentConfiguration config)
        {
            return "~/Views/Shared/Backend/" + TemplateName(config) + "/_applayout.cshtml";
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="resType"></param>
        /// <param name="id"></param>
        /// <param name="resOperator"></param>
        /// <returns></returns>
        public static bool HasRight(this MemberShipContext context, Type resType, string id, Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resType, id, resOperator);
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="resType"></param>
        /// <param name="id"></param>
        /// <param name="resOperator"></param>
        /// <returns></returns>
        public static bool HasRight(this MemberShipContext context, Type resType, object id, Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resType, id, resOperator);
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="resource"></param>
        /// <param name="resOperator"></param>
        /// <returns></returns>
        public static bool HasRight(this MemberShipContext context, object resource, Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resource, resOperator);
        }
    }
}