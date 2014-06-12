﻿using System;
using System.Globalization;
using System.Threading;
using System.Web;
using log4net;

namespace Ornament.Web.HttpModel
{
    public class OrnamentModule : IHttpModule
    {
        private const string _offsethour = "offsetHour";

        #region IHttpModule Members

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;

        }

        public void Dispose()
        {
        }

        #endregion

        public static void SetClientOffsetHour(int hour)
        {
            if (HttpContext.Current != null)
            {
                var strHour = hour.ToString(CultureInfo.InvariantCulture);
                HttpContext.Current.Response.Cookies.Add(new HttpCookie(_offsethour, strHour)
                {
                    HttpOnly = true
                });
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
            string lang = OrnamentContext.MemberShip.CookieRequestLanguage();
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
                LogManager.GetLogger(typeof(OrnamentModule)).Error("Language setting error.", ex);
                lang = "en-US";
                Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(lang);
                Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(lang);
            }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public static int? GetOffSetHour()
        {
            HttpCookie a = HttpContext.Current.Request.Cookies[_offsethour];
            if (a == null)
                return null;
            return Convert.ToInt32(a.Value);
        }
    }
}