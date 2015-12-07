#if !DNXCORE50
using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T">role id</typeparam>
    public class IdentityRoleMaping : ClassMap<IdentityRole>
    {
        public IdentityRoleMaping()
        {
            Table("orn_AspNetRoles");

            Id(x => x.Id).GeneratedBy.UuidString();
            Map(x => x.Name).Length(255).Not.Nullable().Unique();

            Map(x => x.NormalizedName).Length(255);

            //HasManyToMany(x => x.Users)
            //    .Table("orn_AspNetUserRoles")
            //    .ParentKeyColumn("RoleId")
            //    .Cascade.None();
        }

        
    }
}

#endif