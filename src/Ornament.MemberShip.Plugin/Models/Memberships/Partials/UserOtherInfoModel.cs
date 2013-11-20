using System;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
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
            LastPasswordChangedDate = user.Security.LastPasswordChangedDate;
            LastLockoutDate = user.Other.LastLockoutDate;
            LastLoginDate = user.Security.LastLoginDate;
            LastActivityDate = user.Other.LastActivityDate;
        }


        public DateTime? UpdateTime { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime? LastPasswordChangedDate { get; set; }

        public DateTime? LastLockoutDate { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime? LastActivityDate { get; set; }
    }
}