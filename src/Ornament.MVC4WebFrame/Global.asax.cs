using System;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Profile;
using System.Web.Routing;
using System.Web.Security;
using log4net;
using log4net.Config;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.SampleData;
using Ornament.MVCWebFrame.App_Start;
using Ornament.MVCWebFrame.Controllers;
using Ornament.Web.Cfg;
using Ornament.Web.DataInitializers;
using Ornament.Web.PortableAreas.InputBuilder;
using Qi.NHibernateExtender;

namespace Ornament.MVCWebFrame
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            XmlConfigurator.Configure(); //Log4net registry.

            MvcWebConfig.Regist(() =>
            {
                AreaRegistration.RegisterAllAreas();
                WebApiConfig.Register(GlobalConfiguration.Configuration);
                FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
                RouteConfig.RegisterRoutes(RouteTable.Routes);
                BundleConfig.RegisterBundles(BundleTable.Bundles);
                PermissionConfig.Regist();
                //设置member root的初始化密码
                var memberDataInit = GlobalInitializer.Get<MemberShipData>();
                /*if (memberDataInit != null)*/
                memberDataInit.AdminPassword = "123456";
            },
                typeof(HttpErrorsController),
                Assembly.GetExecutingAssembly(), this);


            PermissionConfig.Regist();
            ApplicationConfig.Register(OrnamentContext.Configuration);
            //Ornament setting
            //Registry the Provider to use Membership rule of asp.net.
            //Assembly auto config.

            InputBuilder.BootStrap();
            NotifyConfig.Register();

            MvcWebConfig.InitData();
        }


        private void Profile_MigrateAnonymous(object sender, ProfileMigrateEventArgs args)
        {
            SessionWrapper wrapper = SessionManager.GetSessionWrapper();
            bool a = wrapper.InitSession();
            try
            {
                IUserProfileDao profileDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateProfileDao();
                ProfileValue anonymous = profileDao.FindByLoginId(args.AnonymousID);
                if (anonymous != null)
                {
                    //合并anonymous profile
                    ProfileBase currenProfile = HttpContext.Current.Profile;
                    foreach (string key in anonymous.Properities.Keys)
                    {
                        currenProfile.SetPropertyValue(key, anonymous.Properities[key]);
                    }
                    profileDao.Delete(anonymous);
                    currenProfile.Save();
                    AnonymousIdentificationModule.ClearAnonymousIdentifier();
                }


                //最后，一更新Multi-lang的cookie，因此使用Profile的语言。
                OrnamentContext.MemberShip.SwitchLanguage(OrnamentContext.MemberShip.CurrentUser().Language);
            }
            catch (Exception ex)
            {
                ILog log = LogManager.GetLogger(typeof(GlobalContext));
                log.Error(ex.Message, ex);
            }
            finally
            {
                if (a)
                {
                    wrapper.Close(true);
                }
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

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            var http = exception as HttpException;
            if (http == null || http.GetHttpCode() != 404)
            {
                LogManager.GetLogger(GetType()).Error("Un-handle exception.", exception);
            }
        }
    }
}