using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity.Dao.NhImple
{
    public static class NhIdentityEnterpriseExtension
    {
        public static IdentityBuilder AddNhIdentityEnterprise(
            this IdentityBuilder builder,
            NhUowFactoryBase nhbuilder)
        {
            nhbuilder.AddAssemblyOf(typeof(NhIdentityEnterpriseExtension));
            return builder;
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