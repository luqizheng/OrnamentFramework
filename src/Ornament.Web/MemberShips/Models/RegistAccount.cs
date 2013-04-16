namespace Ornament.Web.MemberShips.Models
{
    public class RegistAccount
    {
        private PasswordModel _password;
        private UserBasicInfoModel _userBasicInfo;

        /// <summary>
        ///     Gets or sets the UserBais
        /// </summary>
        public UserBasicInfoModel UserBasicInfo
        {
            get { return _userBasicInfo ?? (_userBasicInfo = new UserBasicInfoModel()); }
            set { _userBasicInfo = value; }
        }

        public PasswordModel Password
        {
            get { return _password ?? (_password = new PasswordModel()); }
            set { _password = value; }
        }

        /*public virtual bool Regist(IFormsAuthentication formsAuth, ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
                return false;

            if (!System.Web.Security.Membership.RequiresQuestionAndAnswer)
            {
                modelState["PasswordAnswer"].Errors.Clear();
                modelState["PasswordQuestion"].Errors.Clear();
            }

            IUserDao memberShipDao = OrnamentContext.Current.MemberShipFactory().CreateUserDao();
            User user = memberShipDao.GetByLoginId(LoginId);

            if (user != null)
            {
                modelState["LoginId"].Errors.Add(Message.alertMsg_duplicate_loginId);
                return false;
            }

            //check duplicate email address
            user = memberShipDao.GetUserByEmail(Email);
            if (user != null)
            {
                modelState["Email"].Errors.Add(Message.alertMsg_duplicate_Email);
                return false;
            }

            try
            {
                user = new User(LoginId, Password)
                {
                    IsApproved = IsApproved,
                    Email = Email,
                };
                if (System.Web.Security.Membership.RequiresQuestionAndAnswer)
                {
                    user.SetQuestionAndAnswer(PasswordQuestion, PasswordAnswer);
                }
                memberShipDao.SaveOrUpdate(user);
                memberShipDao.Flush();
                LoginByUser(formsAuth, user);
                return true;
            }
            catch (Exception ex)
            {
                modelState.AddModelError("_FORM", ex.Message);
                return false;
            }
        }

        protected virtual void LoginByUser(IFormsAuthentication formsAuth, User user)
        {
            formsAuth.SignIn(user.Id, false);
        }*/
    }
}