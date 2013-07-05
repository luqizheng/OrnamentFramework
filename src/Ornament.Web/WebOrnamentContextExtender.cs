using System;
using System.Web;
using System.Web.Security;
using Castle.MicroKernel.Registration;
using Ornament.Contexts;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web.HttpModel;

namespace Ornament.Web
{
    /// <summary>
    /// </summary>
    public static class WebOrnamentContextExtender
    {
        public static readonly string VerifyCodeKey = "VerifyCode";

        /// <summary>
        /// </summary>
        static WebOrnamentContextExtender()
        {
            OrnamentContext.IocContainer
                           .Register(
                               Component.For<ResourceDescriptionManager>().Instance(new ResourceDescriptionManager()));
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
            //������һ�η��ʴ�������ֵ����ô��Ҫ����һ��LastActivitiyDate��ֵ��
            DateTime now = DateTime.Now;
            if (user.LastActivityDate == null ||
                (now - user.LastActivityDate.Value).Minutes >= Membership.UserIsOnlineTimeWindow)
            {
                user.LastActivityDate = now;
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

        public static int CorrectClientUtcTime(this MemberShipContext context, int clientUtcOfficeHour)
        {
            DateTime serverTime = DateTime.Now;
            return clientUtcOfficeHour - Convert.ToInt32(TimeZoneInfo.Local.GetUtcOffset(serverTime).Hours);
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
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string ProfileLanguage(this MemberShipContext context)
        {
            object a = HttpContext.Current.Profile["language"];
            if (a == null)
                return OrnamentContext.Configuration.DefaultLanguage.Key;
            return (string) a;
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
            HttpContext.Current.Profile["language"] = language;
            OrnamentModule.SiwtchTo(language);
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