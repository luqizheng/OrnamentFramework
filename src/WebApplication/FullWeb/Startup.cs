using FullWeb.Helpers;
using FullWeb.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Ornament.Identity.Dao;
using SmartAdmin.Services;
using Ornament;
using Ornament.NHibernate;
using Microsoft.AspNetCore.Identity;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using System.Collections.Generic;
using Microsoft.Extensions.Options;

namespace FullWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //add options from appsettings.
            services.AddOptions();
            services.AddLocalization();
            // Add framework services.
            services
                .AddMvc()
                .AddViewLocalization(options =>
                {
                    options.ResourcesPath = "Resources";

                })
            .AddDataAnnotationsLocalization();


            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                        {

                            new CultureInfo("zh-CN"),
                            new CultureInfo("zh-HK"),
                            new CultureInfo("zh-TW"),
                            new CultureInfo("en-US"),
                        };

                    options.DefaultRequestCulture = new RequestCulture(culture: "zh-CN", uiCulture: "zh-CN");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;

                });

            var uowFactory = services.AddUintOfWork()
                .MsSql2008(option =>
                {
                    option.ConnectionString(Configuration.GetConnectionString("default"));
                })
                .AddAssemblyOf(typeof(Startup))
                .UpdateSchema(true);

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                // We override the default so we can use our demo user
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;

                options.Cookies.ApplicationCookie.AuthenticationScheme = "ApplicationCookie";
                options.Cookies.ApplicationCookie.CookieName = "Interop";


                // options.Cookies.ApplicationCookie.DataProtectionProvider = DataProtectionProvider.Create(new DirectoryInfo("C:\\Github\\Identity\\artifacts"));

            })
                .AddDefaultTokenProviders()
                .AddNhibernateStores(uowFactory);

            //通信注册。
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();


            //网站自定义配置
            services.Configure<Settings>(Configuration);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            //多语言设置
            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity()
            .UseCookieAuthentication(new CookieAuthenticationOptions()
            {

                LoginPath = new PathString("/Account/Login"),
                CookieSecure = CookieSecurePolicy.None,
                AutomaticChallenge = true,
                AutomaticAuthenticate = true,
                AuthenticationScheme = "CookieAuth"

            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");
            });



        }
    }
}