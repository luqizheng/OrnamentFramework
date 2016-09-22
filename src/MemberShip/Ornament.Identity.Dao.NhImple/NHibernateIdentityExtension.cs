using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity.Dao.NhImple
{
    public static class NHibernateIdentityExtension
    {
        public static IdentityBuilder AddNhibernateStores(
            this IdentityBuilder builder,
            NhUowFactoryBase nhbuilder
        )
        {
            GetDefaultServices(builder);
            nhbuilder.AddAssemblyOf(builder.UserType);
            nhbuilder.AddAssemblyOf(typeof(NHibernateIdentityExtension));

            //RegistPermissionRelative(nhbuilder, typeof(string), roleIdType, builder.RoleType, builder.UserType, userIdType,
            //    builder.Services);
            return builder;
        }


        private static void GetDefaultServices(
            IdentityBuilder builder)
        {
            var userIdType = builder.UserType.BaseType.GetGenericArguments()[0];
            var roleIdType = builder.RoleType.BaseType.GetGenericArguments()[0];

            var userStoreType = typeof(UserStore<,,,>)
                .MakeGenericType(builder.UserType, userIdType, builder.RoleType, roleIdType);
            var roleStoreType = typeof(RoleStore<,>)
                .MakeGenericType(builder.RoleType, roleIdType);

            var service1 = typeof(IUserStore<>).MakeGenericType(builder.UserType);

            var service2 = typeof(IRoleStore<>).MakeGenericType(builder.RoleType);

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