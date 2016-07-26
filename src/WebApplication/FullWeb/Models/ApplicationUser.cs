using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ornament.Identity;
using Ornament.Identity.Dao.Mapping;

namespace FullWeb.Models
{
    public class ApplicationUser : IdentityUser
    {
    }

   

    public class ApplicationUserMapping :
        IdentityUserMapping
    {

    }
}
