using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;
using Ornament.MemberShip.Properties;

namespace Ornament.Models.Memberships.Partials
{
    public class UserOtherInfoModel
    {
        public UserOtherInfoModel()
        {

        }

        public UserOtherInfoModel(User user)
        {
            UpdateTime = user.Other.UpdateTime;
            this.CreateTime = user.Other.CreateTime;
            this.LastPasswordChangedDate = user.Other.LastPasswordChangedDate;
            this.LastLockoutDate = user.Other.LastLockoutDate;
            this.LastLoginDate = user.Other.LastLoginDate;
            this.LastActivityDate = user.Other.LastActivityDate;
        }
        

        public  DateTime? UpdateTime { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime? LastPasswordChangedDate { get; set; }

        public DateTime? LastLockoutDate { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime? LastActivityDate { get; set; }

        
    }
}
