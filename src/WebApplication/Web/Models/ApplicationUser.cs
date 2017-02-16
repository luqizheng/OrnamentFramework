using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApplication.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
    }

    public class ApplicationSettings
    {
        /// <summary>
        ///     Retrieves the entry value for the following composed key: "config:Company" as a string.
        /// </summary>
        public string Company { get; set; }

        /// <summary>
        ///     Retrieves the entry value for the following composed key: "config:Project" as a string.
        /// </summary>
        public string Project { get; set; }

        /// <summary>
        ///     Retrieves the entry value for the following composed key: "config:EnableTiles" as a boolean.
        /// </summary>
        public bool EnableTiles { get; set; }

        /// <summary>
        ///     Retrieves the entry value for the following composed key: "config:EnableLoader" as a boolean.
        /// </summary>
        public bool EnableLoader { get; set; }

        /// <summary>
        ///     Retrieves the entry value for the following composed key: "config:CurrentTheme" as a string.
        /// </summary>
        public string CurrentTheme { get; set; }
    }
}
