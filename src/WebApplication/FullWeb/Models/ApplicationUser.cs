using Ornament.Identity;
using Ornament.Identity.Dao.Mapping;

namespace FullWeb.Models
{
    public class ApplicationUser : IdentityUser<string, ApplicationRole>
    {
    }

    public class ApplicationRole : IdentityRole<int>
    {
    }


    public class ApplicationUserMapping :
        IdentityUserMapping<ApplicationUser, string, ApplicationRole>
    {
        protected override void ExtendSetting()
        {
            Id(s => s.Id).GeneratedBy.UuidHex("N");
        }
    }

    public class ApplicationRoleMapping : IdentityRoleMapping<ApplicationRole, int>
    {
        public override void ExtendSetting()
        {
            Id(s => s.Id).GeneratedBy.Increment();
        }
    }
}