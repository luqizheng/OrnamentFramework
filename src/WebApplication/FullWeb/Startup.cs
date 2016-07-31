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

namespace FullWeb
{
    public class Startup
    {
        private IConfigurationSection _configurationSection;

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
            // Add framework services.
            services.AddMvc();

            var uowFactory = services.AddUintOfWork()
                .MsSql2008(option =>
                {
                    option.ConnectionString(Configuration.GetConnectionString("default"));
                })
                .AddAssemblyOf(typeof(Startup));

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                // We override the default so we can use our demo user
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                
            })
                .AddDefaultTokenProviders()
                .AddNhibernateStores(uowFactory);
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            _configurationSection = Configuration.GetSection("Settings");
            services.AddSingleton(new Settings
            {
                Company = _configurationSection.GetValue<string>("Company"),
                CurrentTheme = _configurationSection.GetValue<string>("CurrentTheme"),
                EnableLoader = _configurationSection.GetValue<bool>("EnableLoader"),
                EnableTiles = _configurationSection.GetValue<bool>("EnableTiles")
            });

          
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

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

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseIdentity();
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                LoginPath = new PathString("/Account/Login"),
                CookieSecure = CookieSecurePolicy.Always
            });
        }
    }
}