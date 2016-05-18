using System;
using Ornament.Identity;
using Ornament.Identity.Dao.Mapping;

namespace Mvc5.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<string>
    {
    }


    public class TypeGenericPermission : GenericPermission<string, int>
    {
    }

    public class UserMapping : IdentityUserMaping<ApplicationUser,string>
    {
        protected override void IdSetting()
        {
            Id(s => s.Id).GeneratedBy.UuidHex("N");
        }
    }
}