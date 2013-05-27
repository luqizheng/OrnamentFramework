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
            State = new UserStateModel();
            OptionInfo = new UserOptionInformation();
            OtherInfo = new UserOtherInfoModel();
        }

        public EditUserModel(User user)
        {
            Id = user.Id;
            BasicInfo = new UserBasicInfoModel(user);
            State = new UserStateModel(user);
            OptionInfo = new UserOptionInformation(user);
            OtherInfo = new UserOtherInfoModel(user);
        }

        public string Id { get; set; }


        public UserBasicInfoModel BasicInfo { get; set; }
        public UserStateModel State { get; set; }
        public UserOptionInformation OptionInfo { get; set; }

        public UserOtherInfoModel OtherInfo { get; set; }

        public User Save(IMemberShipFactory memberShipFactory)
        {
            User user = memberShipFactory.CreateUserDao().Get(Id);
            BasicInfo.UpdateOn(user);
            OptionInfo.UpdateOn(user);
            State.UpdateOn(user);
            
            memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            return user;
        }
    }
}