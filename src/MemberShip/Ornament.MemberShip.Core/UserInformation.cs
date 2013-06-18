using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;

namespace Ornament.MemberShip
{

    #region

    #endregion

    public partial class User
    {
        #region Nested type: UserInformation

        ///// <summary>
        ///// </summary>
        //[Serializable]
        //public class UserInformation
        //{
        private string _email;
        private string _phone;

        //protected UserInformation()
        //{
        //}

        //internal UserInformation(User user)
        //{
        //    User = user;
        //}

        //private User User { get; set; }

        /// <summary>
        ///     Gets or sets Phone.
        /// </summary>
        /// <value>
        ///     The phone.
        /// </value>
        [Display(Name = "Phone", ResourceType = typeof (MembershipCommon)),
         StringLength(30, MinimumLength = 0, ErrorMessage = "长度必须在1至30之间")]
        public virtual string Phone
        {
            get { return _phone; }
            set
            {
                if (Id != string.Empty)
                {
                    ModifyUpdateTime();
                }
                _phone = value;
            }
        }

        /// <summary>
        ///     Gets or sets Email.
        /// </summary>
        /// <value>
        ///     The email.
        /// </value>
        [DataType(DataType.EmailAddress, ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (ErrorMessage)),
         Display(Name = "Email", ResourceType = typeof (MembershipCommon)),
         RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
             ErrorMessageResourceName = "EmailNotRightFormat", ErrorMessageResourceType = typeof (ErrorMessage))]
        [MaxLength(64)]
        public virtual string Email
        {
            get { return _email; }
            set
            {
                if (!String.IsNullOrEmpty(Id))
                {
                    ModifyUpdateTime();
                }
                //const string pattern = @"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b";
                //if (!Regex.IsMatch(value, pattern))
                //    throw new ArgumentException("Available e-mail");

                _email = value;
            }
            
        }

        //}

        #endregion
    }
}