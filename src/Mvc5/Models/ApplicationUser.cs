using Ornament.Identity;

namespace Mvc5.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<string>
    {
    }


    public class TypeGenericPermission : GenericPermission<string, int>
    {
    }
}