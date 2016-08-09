using FullWeb.Models;

namespace FullWeb.Areas.Membership.Models
{
    public class UserEdit : UserInfo
    {
        public UserEdit()
        {

        }
        
        public UserEdit(ApplicationUser result)
        {
            this.Id = result.Id;
            this.Email = result.Email;
            this.PhoneNumber = result.PhoneNumber;
            this.LockoutEnabled = result.LockoutEnabled;
            this.Name = result.Name;
         
        }
    }
}