using System;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate
{
    public static class ConfigExtender
    {
        public static NhUowFactory MsSql2012(this IUnitOfWorkFactoryBuilder provider,
            Action<MsSqlConfiguration> settings, string factoryName = "default")
        {
            var dbSettining = MsSqlConfiguration.MsSql2012;
            settings(dbSettining);

            return Mssql(provider, dbSettining, factoryName);
        }

        public static NhUowFactory MsSql2008(this IUnitOfWorkFactoryBuilder provider, Action<MsSqlConfiguration> settings,
            string name = "default")
        {
            var dbSettining = MsSqlConfiguration.MsSql2008;
            settings(dbSettining);
            return Mssql(provider, dbSettining, name);
        }

        private static NhUowFactory Mssql(IUnitOfWorkFactoryBuilder provider,
            MsSqlConfiguration dbSetting,
            string factoryName)
        {
#if DEBUG
            if (dbSetting == null) throw new ArgumentNullException(nameof(dbSetting));
            if (factoryName == null) throw new ArgumentNullException(nameof(factoryName));
#endif
            var config = Fluently.Configure();
            config.Database(dbSetting);
            var ins = new NhUowFactory(config)
            {
                Name = factoryName
            };
            provider.Add(ins);
            return ins;
        }
    }
}