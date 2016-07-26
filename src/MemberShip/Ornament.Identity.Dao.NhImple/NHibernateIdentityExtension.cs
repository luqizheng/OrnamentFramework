using System;
using Microsoft.AspNetCore.Identity;
using Ornament.NHibernate.Uow;
using Microsoft.Extensions.DependencyInjection;
namespace Ornament.Identity.Dao
{
    public static class NHibernateIdentityExtension
    {
        public static IdentityBuilder AddNhibernateStores(this IdentityBuilder builder,
            NhUowFactory nhbuilder)
        {

            var userIdType = builder.UserType.BaseType.GetGenericArguments()[0];
            var roleIdType = builder.RoleType.BaseType.GetGenericArguments()[0];
            GetDefaultServices(builder.UserType, builder.RoleType, builder, userIdType, roleIdType);
            nhbuilder.AddAssemblyOf(builder.UserType);
            nhbuilder.AddAssemblyOf(typeof(NHibernateIdentityExtension));

            //RegistPermissionRelative(nhbuilder, typeof(string), roleIdType, builder.RoleType, builder.UserType, userIdType,
            //    builder.Services);
            return builder;
        }


        private static void GetDefaultServices(Type userType,
            Type roletype, IdentityBuilder builder, Type userIdType,Type roleIdType)
        {
            var userStoreType = typeof(UserStore<,,>).MakeGenericType(userType, roletype, userIdType);
            var roleStoreType = typeof(RoleStore<,>).MakeGenericType(roletype, roleIdType);

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