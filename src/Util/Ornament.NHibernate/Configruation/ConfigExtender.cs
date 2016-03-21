using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate.Configruation
{
    public enum SessionContextStore
    {
        call,
        thread_static,
        web,
        wcf_operation
    }

    public static class ConfigExtender
    {
        public static NhConfigureBuilder MsSql2012(this IServiceCollection serviceCollection,
            SessionContextStore store = SessionContextStore.web)
        {
            return Mssql(serviceCollection, MsSqlConfiguration.MsSql2012, store);
        }

        public static NhConfigureBuilder MsSql2008(this IServiceCollection serviceCollection,
            SessionContextStore store = SessionContextStore.web)
        {
            return Mssql(serviceCollection, MsSqlConfiguration.MsSql2008, store);
        }

        private static NhConfigureBuilder Mssql(IServiceCollection serviceCollection,
            MsSqlConfiguration dbSetting,
            SessionContextStore store)
        {
            var config = Fluently.Configure();
            config.Database(dbSetting);
            config.CurrentSessionContext(store.ToString());
            //这里需要延迟创建。因为可能还没有build好NH的配置。所以不能用addinstance
            serviceCollection.AddSingleton(i => config.BuildSessionFactory());
            serviceCollection.AddScoped<IUnitOfWorkFactory>(
                i => new NhSessionUowFactory(i.GetService<ISessionFactory>(), serviceCollection));
            serviceCollection.AddScoped(i => i.GetService<IUnitOfWorkFactory>().Create());

            return new NhConfigureBuilder(config, dbSetting);
        }
    }
}