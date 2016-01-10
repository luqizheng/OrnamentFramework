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
        public static IdentityBuilder AddNhibernateStores(this IdentityBuilder builder, NhConfigureBuilder nhbuilder, Type userIdType, Type roleIdType)
        {
            var types = builder.UserType.GenericTypeArguments;
           
            GetDefaultServices(builder.UserType, builder.RoleType, builder, userIdType, roleIdType);
            nhbuilder.AddAssemblyOf(builder.UserType);
            return builder;
        }

        private static void GetDefaultServices(Type userType,
            Type roletype, IdentityBuilder builder, Type userIdType, Type roleIdType)
        {
            var userStoreType = typeof(UserStore<,,,>).MakeGenericType(userType, userIdType, roletype, roleIdType);
            var roleStoreType = typeof(RoleStore<,>).MakeGenericType(roletype, roleIdType);

            var service1 = typeof(IUserStore<>).MakeGenericType(userType);

            var service2 = typeof(IRoleStore<>).MakeGenericType(roletype);

            builder.Services.AddScoped(service1, userStoreType);
            builder.Services.AddScoped(service2, roleStoreType);
        }
    }
}