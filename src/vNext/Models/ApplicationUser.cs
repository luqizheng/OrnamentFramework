using Ornament.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace vNext.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<string, ApplicationRole, String>
    {
    }

    public class ApplicationRole : IdentityRole<string>
    {

    }
}
