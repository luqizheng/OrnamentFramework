using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Identity.Dao;
using Ornament.Identity.Dao.Mapping;
using Ornament.NHibernate.Configruation;
using System;

//using Microsoft.Framework.DependencyInjection;

// ReSharper disable CheckNamespace

namespace Ornament.Identity
// ReSharper restore CheckNamespace
{
    public static class NHibernateIdentityExtension
    {
        public static IdentityBuilder AddNhibernateStores(this IdentityBuilder builder, NhConfigureBuilder nhbuilder)
        {
            GetDefaultServices(builder.UserType, builder.RoleType, builder);
            nhbuilder.AddAssemblyOf<IdentityRoleMap>();
            return builder;
        }

        private static void GetDefaultServices(Type userType,
            Type roletype, IdentityBuilder builder)
        {
            var userStoreType = typeof(UserStore<>).MakeGenericType(userType);
            var roleStoreType = typeof(RoleStore<>).MakeGenericType(roletype);

            var service1 = typeof(IUserStore<>).MakeGenericType(userType);

            var service2 = typeof(IRoleStore<>).MakeGenericType(roletype);

            builder.Services.AddScoped(service1, userStoreType);
            builder.Services.AddScoped(service2, roleStoreType);
        }
    }
}