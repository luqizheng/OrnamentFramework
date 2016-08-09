using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Identity;
using FullWeb.Models;

namespace FullWeb.Areas.Membership.Models
{
    public class UserInfo
    {
        public UserInfo()
        {

        }
        public UserInfo(ApplicationUser result)
        {
            this.Id = result.Id;
            this.Email = result.Email;
            this.PhoneNumber = result.PhoneNumber;
            this.LockoutEnabled = result.LockoutEnabled;
            this.Name = result.Name;

        }
        public string Id { get; set; }
        [Display(Name="电子邮件")]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }
        
       
        public string PhoneNumber { get; set; }

        public string Name { get; set; }
        [Required]
        public string LoginId { get; set; }
        public bool LockoutEnabled { get; set; }
    }
    public class UserListItem: UserInfo
    {      

        public static UserListItem CreateFrom<TUser, TKey, TRole>(TUser user)
            where TUser : IdentityUser<TKey, TRole>
            where TKey : IEquatable<TKey>
        {
            var result = new UserListItem();
            result.Email = user.Email;
            result.PhoneNumber = user.PhoneNumber;
            result.Id = user.Id.ToString();
            result.LockoutEnabled = user.LockoutEnabled;
            result.Name = user.Name;
        
            result.LoginId = user.LoginId;

            return result;
        }
    }
}