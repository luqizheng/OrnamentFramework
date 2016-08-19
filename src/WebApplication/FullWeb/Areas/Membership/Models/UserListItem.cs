﻿using System;
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
            this.LoginId = result.LoginId;
        }
        public string Id { get; set; }
        [Display(Name = "Email", ResourceType = typeof(Ornament.Identity.Resource))]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }

        [Display(Name = "PhoneNumber", ResourceType = typeof(Ornament.Identity.Resource))]
        public string PhoneNumber { get; set; }
        [Display(Name = "Name", ResourceType = typeof(Ornament.Identity.Resource))]
        public string Name { get; set; }
        [Required()]
        [Display(Name="LoginId",ResourceType =typeof(Ornament.Identity.Resource))]
        public string LoginId { get; set; }
        public bool LockoutEnabled { get; set; }

        public void SetTo<TUser, TKey, TRole>(TUser user)
             where TUser : IdentityUser<TKey, TRole>
            where TKey : IEquatable<TKey>
        {
            if (!user.Id.Equals(this.Id))
                throw new ArgumentOutOfRangeException("user", "user is not same as user view model.");
            user.LoginId = this.LoginId;
            user.Name = this.Name;
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

            result.LoginId = user.LoginId;

            return result;
        }
    }
}