using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate.Configruation
{
    public static class ConfigExtender
    {
        public static NhUowFactoryProvider MsSql2012(this IServiceCollection serviceCollection, string connectString)
        {
            var dbSettining = MsSqlConfiguration.MsSql2012;
            dbSettining.ConnectionString(connectString);
            return Mssql(serviceCollection, dbSettining);
        }

        public static NhUowFactoryProvider MsSql2008(this IServiceCollection serviceCollection, string connectString)
        {
            var dbSettining = MsSqlConfiguration.MsSql2008;
            dbSettining.ConnectionString(connectString);
            return Mssql(serviceCollection, dbSettining);
        }

        private static NhUowFactoryProvider Mssql(IServiceCollection serviceCollection,
            MsSqlConfiguration dbSetting)
        {
            var config = Fluently.Configure();
            config.Database(dbSetting);
            var ins = new NhUowFactoryProvider(config, dbSetting, serviceCollection);
            serviceCollection.AddSingleton(i => ins.Create());
            return ins;
        }
    }
}