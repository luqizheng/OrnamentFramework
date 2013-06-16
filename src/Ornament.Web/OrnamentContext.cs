using System;
using System.Globalization;
using System.Web;
using Castle.MicroKernel.Registration;
using Ornament.Contexts;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web
{
    /// <summary>
    /// </summary>
    public static class WebOrnamentContextExtender
    {
        static WebOrnamentContextExtender()
        {
            OrnamentContext.IocContainer
                           .Register(
                               Component.For<ResourceDescriptionManager>().Instance(new ResourceDescriptionManager()));
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
            return a.GetByLoginId(HttpContext.Current.User.Identity.Name);
        }

        public static string ProfileLanguage(this MemberShipContext context)
        {
            object a = HttpContext.Current.Profile["language"];
            if (a == null)
                return CultureInfo.CurrentUICulture.EnglishName;
            return a.ToString();
        }

        public static bool HasRight(this MemberShipContext context,Type resType,string id,Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resType, id, resOperator);
        }
        public static bool HasRight(this MemberShipContext context, Type resType, object id, Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resType, id, resOperator);
        }
        public static bool HasRight(this MemberShipContext context, object resource, Enum resOperator)
        {
            return context.HasRight(context.CurrentUser(), resource, resOperator);
        }

    }
}