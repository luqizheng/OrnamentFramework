using System.Reflection;
using System.Web;
using System.Web.Hosting;
using FluentNHibernate.Cfg;
using NHibernate.Cfg;
using Ornament.Web;
using Qi.NHibernateExtender;

namespace Ornament.MVCWebFrame.App_Start
{
    public class NhConfig
    {
        public static void Config()
        {
            SessionManager.Regist("default", () =>
                {
                    var config = new Configuration();
                    config.Configure(HostingEnvironment.MapPath("~/config/hibernate.cfg.config"));
                    FluentConfiguration result = Fluently.Configure(config);
                    for (int i = 0; i < OrnamentContext.Current.NhAssemblies.Count; i++)
                    {
                        Assembly assembly1 = OrnamentContext.Current.NhAssemblies[i];
                        result.Mappings(s => s.FluentMappings.AddFromAssembly(assembly1));
                    }
                    return result.BuildConfiguration();
                });
        }
    }
}