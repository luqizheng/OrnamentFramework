using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Identity;
using WebApplication.Models;

namespace WebApplication.Areas.Membership.Models
{
    public class OrgDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }
        public int? Parent { get; set; }
    }

    public class UserInfo
    {
        public UserInfo()
        {
        }

        public UserInfo(ApplicationUser result)
        {
            Id = result.Id;
            Email = result.Email;
            PhoneNumber = result.PhoneNumber;
            LockoutEnabled = result.LockoutEnabled;
            //Name = result.Name;
            //LoginId = result.LoginId;
        }

        public string Id { get; set; }

        [Display(Name = "Email", ResourceType = typeof(Resource))]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }

        [Display(Name = "PhoneNumber", ResourceType = typeof(Resource))]
        public string PhoneNumber { get; set; }

        [Display(Name = "Name", ResourceType = typeof(Resource))]
        public string Name { get; set; }

        [Required]
        [Display(Name = "LoginId", ResourceType = typeof(Resource))]
        public string LoginId { get; set; }

        public bool LockoutEnabled { get; set; }

        public void SetTo<TUser, TKey, TRole>(TUser user)
            where TUser : IdentityUser<TKey, TRole>
            where TKey : IEquatable<TKey>
        {
            if (!user.Id.Equals(Id))
                throw new ArgumentOutOfRangeException("user", "user is not same as user view model.");
            user.UserName = LoginId;
            user.Name = Name;
            user.LockoutEnabled = LockoutEnabled;
            user.PhoneNumber = PhoneNumber;
            user.Email = Email;
        }
    }

    public class UserListItem : UserInfo
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

            result.LoginId = user.UserName;

            return result;
        }
    }
}