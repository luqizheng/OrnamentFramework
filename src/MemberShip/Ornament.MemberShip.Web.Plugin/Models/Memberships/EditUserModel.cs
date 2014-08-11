using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Qi.NHibernateExtender;

namespace Ornament.MemberShip.Web.Plugin.Models.Memberships
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
            if (VerifyEmail && EmailHasChanged)
            {
                SendVerifyEmail(user, memberShipFactory);
            }
            return user;
        }
    }
}