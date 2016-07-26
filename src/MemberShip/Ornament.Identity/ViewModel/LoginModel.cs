using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Identity.ViewModel
{
    public class LoginModel
    {
        public LoginModel()
        {
            
        }
        [Required(ErrorMessageResourceName = "LoginId",ErrorMessageResourceType = typeof(Resource))]
        public string LoginId { get; set; }

        public string Password { get; set; }
    }
}
