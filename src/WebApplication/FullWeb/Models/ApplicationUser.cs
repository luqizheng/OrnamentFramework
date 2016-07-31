using Ornament.Identity;
using Ornament.Identity.Dao.Mapping;

namespace FullWeb.Models
{
    public class ApplicationUser : IdentityUser<string,ApplicationRole>
    {
    }

    public class ApplicationRole : IdentityRole<int>
    {
    }


    public class ApplicationUserMapping :
        IdentityUserMapping<ApplicationUser,string,ApplicationRole>
    {
    }

    public class ApplicationRoleMapping : IdentityRoleMapping<ApplicationRole,int>
    {

    }
}