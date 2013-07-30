using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Models.Memberships.Partials;
using Qi.NHibernateExtender;

namespace Ornament.Models.Memberships
{
    public class EditUserModel : BasicInfo
    {
        public EditUserModel()
        {
            Permissions = new PermissionInfo();
            OtherInfo = new UserOtherInfoModel();
        }

        public EditUserModel(User user)
            : base(user)
        {
            Permissions = new PermissionInfo(user);
            OtherInfo = new UserOtherInfoModel(user);
        }
        [UIHint("UserOtherInfo")]
        public UserOtherInfoModel OtherInfo { get; set; }

        [UIHint("_PermissionInfo")]
        public PermissionInfo Permissions { get; set; }

        public User Save(IMemberShipFactory memberShipFactory)
        {
            if (memberShipFactory == null) throw new ArgumentNullException("memberShipFactory");
            User user = memberShipFactory.CreateUserDao().Get(Id);
            UpdateOn(user);
            Permissions.UpdateOn(user);
            memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            SessionManager.GetSessionWrapper().CurrentSession.SaveOrUpdate(user.Contact);
            if (this.VerifyEmail && EmailHasChanged)
            {
                this.SendVerifyEmail(user);
            }
            return user;
        }
    }
}