using System;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate.Tool.hbm2ddl;

namespace Ornament.NHibernate.Configruation
{
    public class NhConfigureBuilder
    {
        private readonly FluentConfiguration _config;
        private readonly MsSqlConfiguration _dbSetting;

        public NhConfigureBuilder
            (FluentConfiguration config, MsSqlConfiguration dbSetting)
        {
            _config = config;
            _dbSetting = dbSetting;
        }

        public NhConfigureBuilder AddAssemblyOf<T>()
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssemblyOf<T>());
            return this;
        }

        public NhConfigureBuilder AddAssemblyOf(Type typeOfMappingClass)
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssembly(typeOfMappingClass.Assembly));

            return this;
        }

        public NhConfigureBuilder AddType(Type t)
        {
            _config.Mappings(m =>
                m.FluentMappings.Add(t));

            return this;
        }

        public NhConfigureBuilder Connection(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString), "ConnectionString is null.");
            _dbSetting.ConnectionString(connectionString);
            return this;
        }

        public NhConfigureBuilder Apply(bool updateDbStructure)
        {
            _config.Database(_dbSetting);
            var config = _config.BuildConfiguration();
            var export = new SchemaExport(config);
            export.Create(true, true);
            return this;
        }
    }
}