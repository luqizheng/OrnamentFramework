using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ClassicWebApplication.Startup))]
namespace ClassicWebApplication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
