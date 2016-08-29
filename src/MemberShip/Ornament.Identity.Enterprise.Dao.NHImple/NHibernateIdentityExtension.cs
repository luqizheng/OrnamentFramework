using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Identity.Enterprise.Stores;
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
            builder.Services.AddScoped<IOrgStore>(s =>
            {
                var unitOfWork = s.GetRequiredService<NhUow>();
                return new OrgStore(unitOfWork);
            });


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