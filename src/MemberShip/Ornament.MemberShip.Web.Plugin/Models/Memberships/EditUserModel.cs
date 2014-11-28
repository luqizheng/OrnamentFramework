using System;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials;
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


        public UserOtherInfoModel OtherInfo { get; set; }


        public PermissionInfo Permissions { get; set; }

        public User Save(IMemberShipFactory memberShipFactory)
        {
            if (memberShipFactory == null) throw new ArgumentNullException("memberShipFactory");

            User user = !String.IsNullOrEmpty(Id)
                ? memberShipFactory.CreateUserDao().Get(Id)
                : new User(LoginId, "123456");
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