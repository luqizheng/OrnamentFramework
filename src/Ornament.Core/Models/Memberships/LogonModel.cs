﻿using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (MemberShipModel))]
        [Display(Name = "LoginId", ResourceType = typeof (MembershipCommon))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof(MemberShipModel))]
        [Display(Name = "Password", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof(MemberShipModel))]
        public bool RememberMe { get; set; }

        public bool Validate(out string errorMessage, IUserDao userDao)
        {
            errorMessage = null;
            User u = userDao.GetByLoginId(User);
            if (u == null)
            {
                errorMessage = MemberShipModel.error_LoginError;
                return false;
            }
            if (u.IsLockout)
            {
                errorMessage = MemberShipModel.error_UserIsLockout;
                return false;
            }

            if (!u.IsApproved)
            {
                errorMessage = MemberShipModel.error_UserIsNotApproved;
                return false;
            }

            bool result = u.ValidateUser(Password);
            if (!result)
            {
                errorMessage = MemberShipModel.error_LoginError;
                return false;
            }
            return true;
        }
    }
}