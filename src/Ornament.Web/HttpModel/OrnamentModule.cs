using System;
using System.Globalization;
using System.Threading;
using System.Web;
using log4net;

namespace Ornament.Web.HttpModel
{
    public class OrnamentModule : IHttpModule
    {
        #region IHttpModule Members

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
        }

        public void Dispose()
        {
        }

        #endregion

        public static void SiwtchTo(string language)
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.Cookies.Add(new HttpCookie("_multiCookie", language));
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
            var utc = context.Request.QueryString["utc"];
            if (!String.IsNullOrEmpty(utc))
            {
                try
                {
                    int offict = Convert.ToInt32(utc);
                    SetClientOffsetHour(OrnamentContext.MemberShip.CorrectClientUtcTime(offict));
                }
                catch (Exception ex)
                {
                    LogManager.GetLogger(this.GetType()).Error("Setting offset minis error.", ex);
                }
            }
        }

        private void MultiLanguage(HttpApplication context)
        {
            HttpCookie cookie = context.Request.Cookies["_multiCookie"];
            if (cookie == null || string.IsNullOrEmpty(cookie.Value))
            {
                return;
            }
            string lang = cookie.Value;
            if (context.Request.UserLanguages != null)
            {
                context.Request.UserLanguages.SetValue(lang, 0);
            }
            Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(lang);
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(lang);
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