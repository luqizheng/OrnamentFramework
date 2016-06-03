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
        public static NhConfigureBuilder MsSql2012(this IServiceCollection serviceCollection)
        {
            return Mssql(serviceCollection, MsSqlConfiguration.MsSql2012);
        }

        public static NhConfigureBuilder MsSql2008(this IServiceCollection serviceCollection)
        {
            return Mssql(serviceCollection, MsSqlConfiguration.MsSql2008);
        }

        private static NhConfigureBuilder Mssql(IServiceCollection serviceCollection,
            MsSqlConfiguration dbSetting)
        {
            var config = Fluently.Configure();
            config.Database(dbSetting);
            //这里需要延迟创建。因为可能还没有build好NH的配置。所以不能用addinstance
            serviceCollection.AddSingleton(i => config.BuildSessionFactory());
            serviceCollection.AddSingleton<IUnitOfWorkFactory>(i => new NhSessionUowFactory(i.GetService<ISessionFactory>(), serviceCollection));
            serviceCollection.AddScoped(i => i.GetService<IUnitOfWorkFactory>().Create());

            return new NhConfigureBuilder(config, dbSetting);
        }
    }
}