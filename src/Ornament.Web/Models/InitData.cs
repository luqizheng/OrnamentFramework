using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Ornament.Web.Models
{
    public class InitData
    {
        private IList<string> _initMethod;

        ///// <summary>
        ///// 
        ///// </summary>
        //[Display(Name = "admin's Password"), Required]
        //[DataType(DataType.Password)]
        //public string Password { get; set; }

        ///// <summary>
        ///// 
        ///// </summary
        //[DataType(DataType.Password), Required]
        //[Compare("Password", ErrorMessage = "Confirm password isn't equal Password.")]
        //public string ConfirmPassword { get; set; }

        ///// <summary>
        ///// Gets or sets a value indecate the admin passwod need to change or not.
        ///// </summary>
        //[Display(Name = "Reset admin password")]
        //public bool ResetAdminPassword { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "DB Structure:"), Required]
        public IList<string> Initializers
        {
            get { return _initMethod ?? (_initMethod = new List<string>()); }
            set { _initMethod = value; }
        }

       
    }
}