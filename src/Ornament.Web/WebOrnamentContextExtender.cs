using System;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using Castle.MicroKernel.Registration;
using Microsoft.Ajax.Utilities;
using Ornament.Contexts;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
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
        private const string LangCookieName = "lang";
        public static readonly string VerifyCodeKey = "VerifyCode";


        /// <summary>
        /// </summary>
        static WebOrnamentContextExtender()
        {
            OrnamentContext.IocContainer
                .Register(
                    Component.For<ResourceDescriptionManager>().Instance(new ResourceDescriptionManager()));
        }



        public static CultureInfo CurrentLanguage(this MemberShipContext context)
        {
            CultureInfo lang = UrlCultureInfo(context) ?? CookieRequestLanguage(context);
            if (lang == null)
            {
                User user = CurrentUser(context);
                lang = user != null ? user.GetLanguage() : BroswerLanguage(context);
            }

            return lang ?? CultureInfo.GetCultureInfo("en");
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
            IUserDao a = OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao();

            User user = a.GetByLoginId(HttpContext.Current.User.Identity.Name);
            if (user == null)
            {
                FormsAuthentication.SignOut();
                FormsAuthentication.RedirectToLoginPage();
                return null;
            }
            //如果最后一次访问大于设置值，那么需要更新一下LastActivitiyDate的值。
            DateTime now = DateTime.Now;
            if (user.Other.LastActivityDate == null ||
                (now - user.Other.LastActivityDate.Value).Minutes >= Membership.UserIsOnlineTimeWindow / 3)
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
            User user = context.CurrentUser();
            if (user != null)
            {
                string timeZoneId = user.TimeZoneId;
                if (!String.IsNullOrEmpty(timeZoneId))
                {
                    return TimeZoneInfo.ConvertTimeBySystemTimeZoneId(serverTime, timeZoneId);
                }
            }
            return serverTime.AddHours(context.OffSetHour());
        }


        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static int OffSetHour(this MemberShipContext context)
        {
            int? clientSetting = OrnamentModule.GetOffSetHour();
            if (clientSetting == null)
                return 0;
            return clientSetting.Value;
        }

        /// <summary>
        ///     把客户端时间转换为服务器时间
        /// </summary>
        /// <param name="context"></param>
        /// <param name="clientTime"></param>
        /// <returns></returns>
        public static DateTime ToServerDateTime(this MemberShipContext context, DateTime clientTime)
        {
            return clientTime.AddHours(-context.OffSetHour());
        }

        /// <summary>
        /// 获取当前浏览器的默认语言,如果和网站支持语言一致,那么返回网站第一个支持的语言
        /// 否知返回线程语言,一般是英语
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static CultureInfo BroswerLanguage(this MemberShipContext context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request.UserLanguages != null)
            {
                foreach (string lang in HttpContext.Current.Request.UserLanguages)
                {
                    try
                    {
                        var culture = CultureInfo.GetCultureInfo(lang);
                        if (
                            OrnamentContext.Configuration.Languages.Any(
                                language => language.CultureInfo.Name.ToLower() == culture.Name.ToLower()))
                        {
                            return culture;
                        }
                    }
                    catch (CultureNotFoundException)
                    {
                    }
                }
            }
            return CultureInfo.GetCultureInfo("en");
        }

        public static CultureInfo UrlCultureInfo(this MemberShipContext context)
        {
            HttpContextBase contextWrapper = new HttpContextWrapper(HttpContext.Current);
            RouteData routeData = RouteTable.Routes.GetRouteData(contextWrapper);
            if (routeData == null)
                return null;
            object culture;
            if (routeData.Values.TryGetValue("culture", out culture))
            {

                try
                {
                    return new CultureInfo(culture.ToString());
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }


        public static CultureInfo CookieRequestLanguage(this MemberShipContext context)
        {
            HttpCookie request = HttpContext.Current.Request.Cookies[LangCookieName];
            if (request != null)
            {
                try
                {
                    return CultureInfo.GetCultureInfo(request.Value);
                }
                catch (Exception)
                {
                    return null;
                }
            }
            return null;
        }


        public static bool SwitchLanguage(this MemberShipContext context, CultureInfo language)
        {
            if (language == null)
                throw new ArgumentNullException("language");

            Thread.CurrentThread.CurrentCulture = language;
            Thread.CurrentThread.CurrentUICulture = language;


            HttpContext.Current.Response.Cookies.Add(new HttpCookie(LangCookieName)
            {
                Value = language.Name,
                HttpOnly = false,
            });

            User currentUser = OrnamentContext.MemberShip.CurrentUser();
            if (currentUser == null) return true;
            if (language.Name != currentUser.GetLanguage().Name)
            {
                currentUser.Language = language.Name;
                OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao().SaveOrUpdate(currentUser);
            }
            return true;
        }

        /// <summary>
        ///     后台Backend laoyout
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        [System.Obsolete("Please use Layout")]
        public static string BackendLayout(this OrnamentConfiguration config)
        {
            return Layout(config);
        }

        public static string Layout(this OrnamentConfiguration config)
        {
            return "~/Views/Shared/_layout.cshtml";
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