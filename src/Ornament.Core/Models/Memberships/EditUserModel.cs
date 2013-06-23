using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Models.Memberships.Partials;

namespace Ornament.Models.Memberships
{
    public class EditUserModel
    {
        public EditUserModel()
        {
            BasicInfo = new UserBasicInfoModel();

            OptionInfo = new UserOptionInformation();
            OtherInfo = new UserOtherInfoModel();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        public EditUserModel(User user)
        {
            LoginId = user.LoginId;
            Id = user.Id;
            BasicInfo = new UserBasicInfoModel(user);
            OptionInfo = new UserOptionInformation(user);
            OtherInfo = new UserOtherInfoModel(user);
        }
        /// <summary>
        /// 
        /// </summary>
        public string Id { get; set; }

        [UIHint("UserBasicInfo")]
        public UserBasicInfoModel BasicInfo { get; set; }

        [UIHint("UserOptionInfo")]
        public UserOptionInformation OptionInfo { get; set; }

        [UIHint("UserOtherInfo")]
        public UserOtherInfoModel OtherInfo { get; set; }

        public string LoginId { get; set; }

        public User Save(IMemberShipFactory memberShipFactory)
        {
            User user = memberShipFactory.CreateUserDao().Get(Id);
            BasicInfo.UpdateOn(user);
            OptionInfo.UpdateOn(user);

            memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            return user;
        }
    }
}