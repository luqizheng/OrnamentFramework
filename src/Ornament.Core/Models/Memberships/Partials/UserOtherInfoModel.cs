using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;

namespace Ornament.Models.Memberships.Partials
{
    public class UserOtherInfoModel
    {
        public UserOtherInfoModel()
        {

        }

        public UserOtherInfoModel(User user)
        {
            UpdateTime = user.UpdateTime;
            this.CreateTime = user.CreateTime;
            this.LastPasswordChangedDate = user.LastPasswordChangedDate;
            this.LastLockoutDate = user.LastLockoutDate;
            this.LastLoginDate = user.LastLoginDate;
            this.LastActivityDate = user.LastActivityDate;
        }
        public DateTime? UpdateTime { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime? LastPasswordChangedDate { get; set; }

        public DateTime? LastLockoutDate { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime? LastActivityDate { get; set; }
    }
}
