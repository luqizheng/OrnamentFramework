using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Properties;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public partial class User
    {
        public class ContactInfo : DomainObject<ContactInfo, string>
        {
            protected ContactInfo()
            {

            }
            internal
                protected ContactInfo(User user)
            {
                User = user;
            }
            private string _email;
            private string _phone;

            public virtual User User { get; protected set; }

            /// <summary>
            ///     Gets or sets Phone.
            /// </summary>
            /// <value>
            ///     The phone.
            /// </value>
            [Display(Name = "Phone",
                ResourceType = typeof(Resources)),
             StringLength(30)]
            public virtual string Phone
            {
                get { return _phone; }
                set
                {
                    if (_phone != string.Empty)
                    {
                        User.ModifyUpdateTime();

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
                ErrorMessageResourceType = typeof(ErrorMessage)),
             Display(Name = "Email", ResourceType = typeof(Resources)),
             RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
                 ErrorMessageResourceName = "EmailNotRightFormat", ErrorMessageResourceType = typeof(ErrorMessage))]
            [MaxLength(64)]
            public virtual string Email
            {
                get { return _email; }
                set
                {
                    if (!String.IsNullOrEmpty(User.Id))
                    {
                        User.ModifyUpdateTime();
                    }
                    _email = value;
                }
            }
        }


    }
}
