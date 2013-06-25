using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip
{
    public partial class User
    {
        private string _email;
        private string _phone;


        /// <summary>
        ///     Gets or sets Phone.
        /// </summary>
        /// <value>
        ///     The phone.
        /// </value>
        [Display(Name = "Phone", ResourceType = typeof (Resources)),
         StringLength(30)]
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
         Display(Name = "Email", ResourceType = typeof (Resources)),
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
                _email = value;
            }
        }
    }
}