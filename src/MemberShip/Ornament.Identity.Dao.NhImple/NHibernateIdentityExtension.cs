using System;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Identity.Dao;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity
{
    public static class NHibernateIdentityExtension
    {
        public static IdentityBuilder AddNhibernateStores(this IdentityBuilder builder,
            NhUowFactory nhbuilder)
        {
            var roleIdType = typeof(IdentityRole);
            var userIdType = builder.UserType.BaseType.GetGenericArguments()[0];
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
            var userStoreType = typeof(UserStore<,,,,>).MakeGenericType(userType, userIdType);
            var roleStoreType = typeof(RoleStore<>).MakeGenericType(userIdType);

            var service1 = typeof(IUserStore<>).MakeGenericType(userType);

            var service2 = typeof(IRoleStore<>).MakeGenericType(roletype);

            builder.Services.AddScoped(service1, userStoreType);
            builder.Services.AddScoped(service2, roleStoreType);
        }

        //private static void BuildMappingBuilder()
        //{
        //    var asmName = new AssemblyName("identity");
        //    var asmBuilder = AppDomain.CurrentDomain.DefineDynamicAssembly(asmName, AssemblyBuilderAccess.Run);
        //    var mdlBldr = asmBuilder.DefineDynamicModule("Main");
        //    var typeBldr = mdlBldr.DefineType("UserStoreType", TypeAttributes.Public);
        //} 
    }
}