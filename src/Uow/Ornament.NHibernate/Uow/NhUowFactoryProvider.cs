using System;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Ornament.Domain.Uow;

namespace Ornament.NHibernate.Uow
{
    public class NhUowFactoryProvider : IUnitOfWorkFactory
    {
        private readonly FluentConfiguration _config;
        private readonly MsSqlConfiguration _dbSetting;
        private readonly object _lockSessionFactory = 1;
        private ISessionFactory _sessionFactory;

        public NhUowFactoryProvider
            (FluentConfiguration config, MsSqlConfiguration dbSetting, object lockSessionFactory)
        {
            _config = config;
            _dbSetting = dbSetting;
            _lockSessionFactory = lockSessionFactory;
        }


        public string Name { get; set; }

        public IUnitOfWork Create()
        {
            if (_sessionFactory == null)
            {
                lock (_lockSessionFactory)
                {
                    if (_sessionFactory == null)
                        _sessionFactory = _config.BuildSessionFactory();
                }
            }
            return new NhUow(_sessionFactory);
        }

        public NhUowFactoryProvider AddAssemblyOf<T>()
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssemblyOf<T>());
            return this;
        }

        public NhUowFactoryProvider AddAssemblyOf(Type typeOfMappingClass)
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssembly(typeOfMappingClass.Assembly));

            return this;
        }

        public NhUowFactoryProvider AddType(Type t)
        {
            _config.Mappings(m =>
                m.FluentMappings.Add(t));

            return this;
        }

        public NhUowFactoryProvider Connection(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString), "ConnectionString is null.");
            _dbSetting.ConnectionString(connectionString);
            return this;
        }

        public NhUowFactoryProvider UpdateSchema(bool updateDbStructure)
        {
            _config.Database(_dbSetting);
            var config = _config.BuildConfiguration();
            var export = new SchemaExport(config);
            export.Create(true, true);
            return this;
        }
    }
}