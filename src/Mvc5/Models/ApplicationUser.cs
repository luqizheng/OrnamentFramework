using Ornament.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Mvc5.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : Ornament.Identity.IdentityUser<string, ApplicationRole, int>
    {
    }

    public class ApplicationRole : IdentityRole<int> { }

    public class TypePermission : Permission<ApplicationRole, int>
    {
        
    }
}
