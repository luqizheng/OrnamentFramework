using System;
using System.Globalization;
using System.Threading;
using System.Web;
using log4net;

namespace Ornament.Web.HttpModel
{
    public class OrnamentModule : IHttpModule
    {
        private const string langCookieName = "lang";

        #region IHttpModule Members

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
            context.AuthenticateRequest += context_AuthenticateRequest;
            context.PostAuthenticateRequest += context_AuthenticateRequest;
        }

        void context_AuthenticateRequest(object sender, EventArgs e)
        {

            if (OrnamentContext.MemberShip.CurrentUser() != null && OrnamentContext.MemberShip.CurrentUser().Language != Thread.CurrentThread.CurrentUICulture.Name)
            {
                try
                {
                    var lang = OrnamentContext.MemberShip.CurrentUser().Language;
                    OrnamentContext.MemberShip.SwitchLanguage(lang);
                    Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(lang);
                    Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(lang);
                }
                catch (Exception ex)
                {
                }
            }
        }

        public void Dispose()
        {
        }

        #endregion

        [Obsolete]
        public static void SiwtchTo(string language)
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.Cookies.Add(new HttpCookie(langCookieName, language));
            }
        }

        public static void SetClientOffsetHour(int hour)
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.Cookies.Add(new HttpCookie("offsetHour",
                    hour.ToString(CultureInfo.InvariantCulture)));
            }
        }

        private void context_BeginRequest(object sender, EventArgs e)
        {
            var context = (HttpApplication)sender;
            MultiLanguage(context);
            string utc = context.Request.QueryString["utc"];
            if (!String.IsNullOrEmpty(utc))
            {
                try
                {
                    int offict = Convert.ToInt32(utc);
                    SetClientOffsetHour(OrnamentContext.CorrectClientUtcTime(offict));
                }
                catch (Exception ex)
                {
                    LogManager.GetLogger(GetType()).Error("Setting offset minis error.", ex);
                }
            }
        }

        private void MultiLanguage(HttpApplication context)
        {

            string lang = OrnamentContext.MemberShip.CookieLanguage();
            if (lang == null)
            {
                lang = OrnamentContext.MemberShip.BroswerLanguage();
            }
            if (lang == null)
            {
                lang = OrnamentContext.Configuration.DefaultLanguage.Key;
            }
            try
            {
                Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(lang);
                Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(lang);
            }
            catch (Exception ex)
            {
            }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public static int? GetOffSetHour()
        {
            HttpCookie a = HttpContext.Current.Request.Cookies["offsetHour"];
            if (a == null)
                return null;
            return Convert.ToInt32(a.Value);
        }
    }
}