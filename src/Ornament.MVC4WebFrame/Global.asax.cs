﻿using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Profile;
using System.Web.Routing;
using System.Web.Security;
using Ornament.AppStart;
using Ornament.MVCWebFrame.App_Start;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.Web;
using Ornament.Web.Models;
using Qi.NHibernateExtender;
using Qi.Web.Mvc;
using Qi.Web.Mvc.NHMvcExtender;
using log4net;
using log4net.Config;

namespace Ornament.MVCWebFrame
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            XmlConfigurator.Configure(); //Log4net registry.


            AreaRegistration.RegisterAllAreas();
            ValueProviderFactories.Factories[1] = new NHFormValueProviderFactory();
            ValueProviderFactories.Factories[4] = new NHQueryValuePrivoderFactory();

            MvcExtender.Register();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            PermissionConfig.Regist();
            MessageConfig.Register(OrnamentContext.Current);
            //Ornament setting
            //Registry the Provider to use Membership rule of asp.net.
            MembershipContext.Provider = Membership.Provider as IMemberShipProvider;
            NhConfig.Config();
        }


      


        private void Profile_MigrateAnonymous(object sender, ProfileMigrateEventArgs args)
        {
            SessionWrapper wrapper = SessionManager.GetSessionWrapper();
            wrapper.InitSession();
            try
            {
                IUserProfileDao profileDao = OrnamentContext.Current.MemberShipFactory().CreateProfileDao();
                ProfileValue anonymous = profileDao.FindByLoginId(args.AnonymousID);
                if (anonymous != null)
                {
                    ProfileBase currenProfile = HttpContext.Current.Profile;
                    foreach (string key in anonymous.Properities.Keys)
                    {
                        currenProfile.SetPropertyValue(key, anonymous.Properities[key]);
                    }
                    profileDao.Delete(anonymous);
                    currenProfile.Save();
                    AnonymousIdentificationModule.ClearAnonymousIdentifier();
                }
            }
            catch (Exception ex)
            {
                ILog log = LogManager.GetLogger(typeof (GlobalContext));
                log.Error(ex.Message, ex);
            }
            finally
            {
                wrapper.Close(true);
            }
        }

        protected void Application_BeginRequest()
        {
            HttpRequest Request = HttpContext.Current.Request;
            HttpResponse Response = HttpContext.Current.Response;
            /* Fix for the Flash Player Cookie bug in Non-IE browsers.
             * Since Flash Player always sends the IE cookies even in FireFox
             * we have to bypass the cookies by sending the values as part of the POST or GET
             * and overwrite the cookies with the passed in values.
             * 
             * The theory is that at this point (BeginRequest) the cookies have not been read by
             * the Session and Authentication logic and if we update the cookies here we'll get our
             * Session and Authentication restored correctly
             */

            try
            {
                string session_param_name = "ASPSESSID";
                string session_cookie_name = "ASP.NET_SESSIONID";

                if (HttpContext.Current.Request.Form[session_param_name] != null)
                {
                    UpdateCookie(session_cookie_name, HttpContext.Current.Request.Form[session_param_name]);
                }
                else if (HttpContext.Current.Request.QueryString[session_param_name] != null)
                {
                    UpdateCookie(session_cookie_name, HttpContext.Current.Request.QueryString[session_param_name]);
                }
            }
            catch (Exception)
            {
                Response.StatusCode = 500;
                Response.Write("Error Initializing Session");
            }

            try
            {
                string auth_param_name = "AUTHID";
                string auth_cookie_name = FormsAuthentication.FormsCookieName;

                if (HttpContext.Current.Request.Form[auth_param_name] != null)
                {
                    UpdateCookie(auth_cookie_name, HttpContext.Current.Request.Form[auth_param_name]);
                }
                else if (HttpContext.Current.Request.QueryString[auth_param_name] != null)
                {
                    UpdateCookie(auth_cookie_name, HttpContext.Current.Request.QueryString[auth_param_name]);
                }
            }
            catch (Exception)
            {
                Response.StatusCode = 500;
                Response.Write("Error Initializing Forms Authentication");
            }
        }

        private static void UpdateCookie(string cookie_name, string cookie_value)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get(cookie_name);
            if (cookie == null)
            {
                cookie = new HttpCookie(cookie_name);
                //SWFUpload 的Demo中给的代码有问题，需要加上cookie.Expires 设置才可以
                cookie.Expires = DateTime.Now.AddYears(1);
                HttpContext.Current.Request.Cookies.Add(cookie);
            }
            cookie.Value = cookie_value;
            HttpContext.Current.Request.Cookies.Set(cookie);
        }
    }
}