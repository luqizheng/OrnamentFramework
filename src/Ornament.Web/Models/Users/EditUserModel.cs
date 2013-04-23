using Ornament.Web.MemberShips.Models.Users;
using Ornament.Web.Models.Users.Partials;

namespace Ornament.Web.Models.Users
{
    public class EditUserModel
    {
        public EditUserModel()
        {
            BasicInfo = new UserBasicInfoModel();
            State = new UserStateModel();
            OptionInfo = new UserOptionInformation();
        }

        public UserBasicInfoModel BasicInfo { get; set; }
        public UserStateModel State { get; set; }
        public UserOptionInformation OptionInfo { get; set; }
    }
}