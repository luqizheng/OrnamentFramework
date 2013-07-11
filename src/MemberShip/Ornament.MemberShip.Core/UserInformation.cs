using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Properties;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public partial class User
    {
        public class OtherUserInfo:DomainObject<OtherUserInfo,string>
        {
            internal protected OtherUserInfo(User user)
            {
                this.User = user;
            }
            protected OtherUserInfo()
            {

            }
            public virtual User User { get; protected set; }

            /// <summary>
            ///     获取用户创建时间
            /// </summary>
            [Display(Name = "CreateTime", ResourceType = typeof(Resources))]
            public virtual DateTime CreateTime { get; internal protected set; }

            /// <summary>
            ///     获取用户最后改变时间
            /// </summary>
            [Display(Name = "LastPasswordChangedTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastPasswordChangedDate { get; set; }

            /// <summary>
            ///     获取用户被锁定的时间
            /// </summary>
            [Display(Name = "LastLockTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastLockoutDate { get; internal protected set; }

            /// <summary>
            ///     获取用户最后登录时间
            /// </summary>
            [Display(Name = "LastLoginTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastLoginDate { get; internal protected set; }

            /// <summary>
            ///     获取或设定用户最后活跃时间
            /// </summary>
            [Display(Name = "LastActivityTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastActivityDate { get; set; }

            /// <summary>
            ///     Gets or sets UpdateTime.
            /// </summary>
            /// <value>
            ///     The update time.
            /// </value>
            [Display(Name = "LastUpdateTime", ResourceType = typeof(Resources))]
            public virtual DateTime? UpdateTime { get; internal protected set; }
        }
    }
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