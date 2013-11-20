using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class CreateUserModel : BasicInfo
    {
        private const string Password = "123456";


        public CreateUserModel()
        {
            Permissions = new PermissionInfo();
        }

        [UIHint("_PermissionInfo")]
        public PermissionInfo Permissions { get; set; }


        /// <summary>
        ///     Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(LoginId, Password);
            UpdateOn(createUser);
            //Check duplicate account.
            IUserDao userDao = dao.CreateUserDao();
            User user = userDao.GetByLoginId(createUser.LoginId);
            if (user != null)
            {
                errorMessage = "Duplciate login Id.";
                return false;
            }
            userDao.SaveOrUpdate(createUser);
            userDao.Flush();
            SendVerifyEmail(createUser);

            return true;
        }
    }
}