using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Web.Models.Users
{
    public class CreateUserModel : EditUserModel
    {
        /// <summary>
        ///     Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(BasicInfo.LoginId, "123456")
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