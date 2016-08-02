using System;
using FluentNHibernate.Cfg;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Ornament.Domain.Uow;

namespace Ornament.NHibernate.Uow
{
    public class NhUowFactory : IUnitOfWorkFactory
    {
        private readonly FluentConfiguration _config;


        private readonly object _sessionFactoryLocke = 1;
        private ISessionFactory _sessionFactory;

        public NhUowFactory(FluentConfiguration config)
        {
            if (config == null) throw new ArgumentNullException(nameof(config));
            _config = config;
        }

        public bool BeginTransaction { get; set; }
        public bool OpenStateless { get; set; }

        /// <summary>
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IUnitOfWork Create()
        {
            if (_sessionFactory == null)
            {
                lock (_sessionFactoryLocke)
                {
                    if (_sessionFactory == null)
                        _sessionFactory = _config.BuildSessionFactory();
                }
            }
            if (OpenStateless)
                return new NhUowStateless(_sessionFactory, BeginTransaction);
            return new NhUow(_sessionFactory, BeginTransaction);
        }

        public NhUowFactory AddAssemblyOf<T>()
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssemblyOf<T>());
            return this;
        }

        public NhUowFactory AddAssemblyOf(Type typeOfMappingClass)
        {
            _config.Mappings(m =>
                m.FluentMappings.AddFromAssembly(typeOfMappingClass.Assembly));

            return this;
        }

        public NhUowFactory AddType(Type t)
        {
            _config.Mappings(m =>
                m.FluentMappings.Add(t));

            return this;
        }

        public NhUowFactory UpdateSchema(bool updateDbStructure)
        {
            var config = _config.BuildConfiguration();
            var export = new SchemaUpdate(config);
            export.Execute(true, true);
            return this;
        }
    }
}