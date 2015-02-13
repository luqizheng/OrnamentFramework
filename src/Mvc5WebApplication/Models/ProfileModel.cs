using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.MemberShip;
using Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials;

namespace WebApplication.Models
{
    public class ProfileModel
    {
        public ProfileModel()
        {

        }

        public ProfileModel(User user)
        {
            this.BasicInfo=new BasicInfo(user);

        }
        public BasicInfo BasicInfo { get; set; }
    }
}