using System;
using System.ComponentModel.DataAnnotations;

namespace Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials
{
    public class UserOtherInfoModel
    {
        public UserOtherInfoModel()
        {
        }

        public UserOtherInfoModel(User user)
        {
            UpdateTime = user.Other.UpdateTime;
            CreateTime = user.Other.CreateTime;
            LastPasswordChangedTime = user.Security.LastPasswordChangedDate;
            LastLockoutDate = user.Security.LastLockoutDate;
            LastLoginDate = user.Security.LastLoginDate;
            LastActivityTime = user.Other.LastActivityDate;
        }

        [Display(Name = "LastUpdateTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime? UpdateTime { get; set; }

        [Display(Name = "CreateTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime CreateTime { get; set; }

        [Display(Name = "LastPasswordChangedTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime? LastPasswordChangedTime { get; set; }

        [Display(Name = "LastLockTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime? LastLockoutDate { get; set; }

        [Display(Name = "LastLoginTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime? LastLoginDate { get; set; }

        [Display(Name = "LastActivityTime", ResourceType = typeof(Ornament.MemberShip.Properties.Resources))]
        public DateTime? LastActivityTime { get; set; }
    }
}