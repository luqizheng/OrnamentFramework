using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate
{
    public static class ConfigExtender
    {
        public static NhUowFactory MsSql2012(this IUnitOfWorkProvider provider,
            string connectString, string factoryName = "default")
        {
            var dbSettining = MsSqlConfiguration.MsSql2012;
            dbSettining.ConnectionString(connectString);
            return Mssql(provider, dbSettining, factoryName);
        }

        public static NhUowFactory MsSql2008(this IUnitOfWorkProvider provider, string connectString, string name = "default")
        {
            var dbSettining = MsSqlConfiguration.MsSql2008;
            dbSettining.ConnectionString(connectString);
            return Mssql(provider, dbSettining, name);
        }

        private static NhUowFactory Mssql(IUnitOfWorkProvider provider,
            MsSqlConfiguration dbSetting, string factoryName)
        {
            var config = Fluently.Configure();
            config.Database(dbSetting);
            var ins = new NhUowFactory(config)
            {
                Name = factoryName
            };
            provider.Add(ins);
            return ins;
        }

        public static NhUowFactory Configuration(this IServiceCollection serviceCollection, FluentConfiguration config)
        {
            return new NhUowFactory(config);
        }
    }
}