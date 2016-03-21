using System;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Identity.Dao;
using Ornament.Identity.Dao.Mapping;
using Ornament.Identity.Stores;
using Ornament.NHibernate.Configruation;

//using Microsoft.Framework.DependencyInjection;

// ReSharper disable CheckNamespace

namespace Ornament.Identity
// ReSharper restore CheckNamespace
{
    public static class NHibernateIdentityExtension
    {
        public static IdentityBuilder AddNhibernateStores(this IdentityBuilder builder, NhConfigureBuilder nhbuilder)
        {
            var roleIdType = builder.RoleType.GetGenericArguments()[0];
            var userIdType = builder.UserType.GetGenericArguments()[0];
            GetDefaultServices(builder.UserType, builder.RoleType, builder, userIdType, roleIdType);
            nhbuilder.AddAssemblyOf(builder.UserType);
            nhbuilder.AddAssemblyOf(typeof(NHibernateIdentityExtension));

            //RegistPermissionRelative(nhbuilder, typeof(string), roleIdType, builder.RoleType, builder.UserType, userIdType,
            //    builder.Services);
            return builder;
        }


        private static void GetDefaultServices(Type userType,
            Type roletype, IdentityBuilder builder, Type userIdType, Type roleIdType)
        {
            var userStoreType = typeof(UserStore<,>).MakeGenericType(userType, userIdType);
            var roleStoreType = typeof (RoleStore);

            var service1 = typeof(IUserStore<>).MakeGenericType(userType);

            var service2 = typeof(IRoleStore<>).MakeGenericType(roletype);

            builder.Services.AddScoped(service1, userStoreType);
            builder.Services.AddScoped(service2, roleStoreType);
        }

        //private static void RegistPermissionRelative(NhConfigureBuilder nhBuilder,
        //    Type typeofResource,
        //    Type roleIdType, Type roleType, Type userType, Type userIdType, IServiceCollection services)
        //{
        //    var permissionType = typeof(GenericPermission<,,>).MakeGenericType(typeofResource, roleType, roleIdType);
           
        //    nhBuilder.AddType(typeof(PermissionMapping<,,>).MakeGenericType(permissionType, roleType, roleIdType));

        //    //permission
        //    var permissionServer1 = typeof(IUserPermissionStore<,,,,,>).MakeGenericType(typeofResource,
        //        permissionType, userType,
        //        userIdType, roleType, roleIdType);
        //    var imple = typeof(PermissionStore<,,,,>).MakeGenericType(permissionType, userType, userIdType, roleType,
        //        roleIdType);

        //    services.AddScoped(permissionServer1, imple);
        //}

       
    }
}