using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;

namespace Ornament.Web.IoC
{
    public class CastleDependcyResolver : IDependencyResolver
    {
        public void Dispose()
        {
        }

        public object GetService(Type serviceType)
        {
            if (OrnamentContext.IocContainer.Kernel.HasComponent(serviceType))
            {
                return OrnamentContext.IocContainer.Resolve(serviceType);
            }
            return null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            if (OrnamentContext.IocContainer.Kernel.HasComponent(serviceType))
            {
                return null;
            }
            Array r = OrnamentContext.IocContainer.ResolveAll(serviceType);
            var result = new List<object>();
            foreach (object o in r)
            {
                result.Add(r);
            }
            return result;
        }

        public IDependencyScope BeginScope()
        {
            return new ReleasingDependencyScope(this, OrnamentContext.IocContainer.Release);
        }
    }

    internal class ReleasingDependencyScope : IDependencyScope
    {
        private readonly List<object> instances;
        private readonly Action<object> release;
        private readonly IDependencyScope scope;

        public ReleasingDependencyScope(IDependencyScope scope, Action<object> release)
        {
            if (scope == null)
            {
                throw new ArgumentNullException("scope");
            }

            if (release == null)
            {
                throw new ArgumentNullException("release");
            }

            this.scope = scope;
            this.release = release;
            instances = new List<object>();
        }

        public object GetService(Type t)
        {
            object service = scope.GetService(t);
            AddToScope(service);

            return service;
        }

        public IEnumerable<object> GetServices(Type t)
        {
            IEnumerable<object> services = scope.GetServices(t);
            AddToScope(services);

            return services;
        }

        public void Dispose()
        {
            foreach (object instance in instances)
            {
                release(instance);
            }

            instances.Clear();
        }

        private void AddToScope(params object[] services)
        {
            if (services.Any())
            {
                instances.AddRange(services);
            }
        }
    }
}