using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Web.MemberShips.Models.Users;
using Ornament.Web.Models.Users.Partials;

namespace Ornament.Web.Models.Users
{
    public class EditUserModel
    {
        public EditUserModel()
        {
            BasicInfo=new UserBasicInfoModel();
            State=new UserStateModel();
            OptionInfo=new UserOptionInformation();
        }
        public UserBasicInfoModel BasicInfo { get; set; }
        public UserStateModel State { get; set; }
        public UserOptionInformation OptionInfo { get; set; }
    }
    public class CreateUserModel : EditUserModel
    {
        /// <summary>
        /// Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(this.BasicInfo.LoginId, "123456")
                {
                    IsApproved = false,
                    Email = BasicInfo.Email,
                    Name = OptionInfo.Name,
                    Phone = OptionInfo.Phone
                };
            User user = dao.CreateUserDao().GetByLoginId(createUser.LoginId);
            if (user != null)
            {
                errorMessage = "Duplciate login Id.";
                return false;
            }
            return true;
        }
    }
}
