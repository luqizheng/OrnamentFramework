using System;
using System.Globalization;
using System.Threading;
using System.Web;

namespace Ornament.Web.Languages
{
    public class LanguageManager : IHttpModule
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

        private void context_BeginRequest(object sender, EventArgs e)
        {
            var context = (HttpApplication)sender;
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
    }
}