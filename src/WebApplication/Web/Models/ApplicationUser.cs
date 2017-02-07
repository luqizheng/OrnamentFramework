using Ornament.Identity;

namespace WebApplication.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<string,ApplicationRole>
    {
    }

    public class ApplicationRole : IdentityRole<int>
    {
        
    }
}