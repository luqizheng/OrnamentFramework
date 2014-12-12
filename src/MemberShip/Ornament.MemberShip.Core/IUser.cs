using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Validations;

namespace Ornament.MemberShip
{
    public interface IUserSetting
    {
        [Display(Name = "TimeZone", ResourceType = typeof (Resources))]
        [UIHint("TimeZone")]
        string TimeZoneId { get; set; }

        /// <summary>
        ///     Gets or sets language
        /// </summary>
        [Display(Name = "Language", ResourceType = typeof (Resources))]
        [UIHint("Language")]
        string Language { get; set; }
    }

    public interface IUserStatus
    {
        /// <summary>
        ///     Gets or sets Deny, if set to True, user can't be access
        /// </summary>
        [Display(Name = "error_UserIsDeny", ResourceType = typeof (Resources))]
        bool IsDeny { get; set; }

        /// <summary>
        ///     Gets or sets Comment.
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">
        /// </exception>
        /// <value>
        ///     The comment.
        /// </value>
        [Display(Name = "Remark", ResourceType = typeof (Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (Resources))]
        [UIHint("Textarea")]
        [StringLength(200, ErrorMessageResourceName = "RemarkOverMaxLength",
ErrorMessageResourceType = typeof(Resources))]
        string Remarks { get; set; }
    }

    public interface IUser
    {
        string Id { get; }

        /// <summary>
        ///     Gets or sets LoginId.
        /// </summary>
        /// <value>
        ///     The login id.
        /// </value>
        [Display(Name = "LoginId", ResourceType = typeof (Resources)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequireLoginId",
             ErrorMessageResourceType = typeof (Resources))]
        [LoginIdValidation]
        string LoginId { get; set; }

        /// <summary>
        ///     显示名称。
        /// </summary>
        [Display(Name = "UserName", ResourceType = typeof (Resources))]
        [MaxLength(64)]
        string Name { get; set; }

        /// <summary>
        ///     User Org
        /// </summary>
        [Display(Name = "Org", ResourceType = typeof (Resources))]
        [UIHint("Org")]
        Org Org { get; set; }
    }

    public interface IContactInfo
    {
        /// <summary>
        ///     Gets or sets Phone.
        /// </summary>
        /// <value>
        ///     The phone.
        /// </value>
        [Display(Name = "Phone", ResourceType = typeof (Resources)), StringLength(30)]
        string Phone { get; set; }

        /// <summary>
        ///     Gets or sets Email.
        /// </summary>
        /// <value>
        ///     The email.
        /// </value>
        [DataType(DataType.EmailAddress, ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (Resources)), Display(Name = "Email",
                ResourceType = typeof (Resources)),
         RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
             ErrorMessageResourceName = "EmailNotRightFormat", ErrorMessageResourceType = typeof (Resources))]
        [MaxLength(64)]
        string Email { get; set; }

        bool EmailVerified { get; set; }
        bool PhoneVerified { get; set; }

        [Display(Name = "FirstName", ResourceType = typeof (Resources))]
        [MaxLength(64)]
        string FirstName { get; set; }

        [Display(Name = "LastName", ResourceType = typeof (Resources))]
        [MaxLength(64)]
        string LastName { get; set; }

        [Display(Name = "Birthday", ResourceType = typeof (Resources))]
        [Qi.Domain.Attributes.DateRange("1940-01-01","2020-12-31","yyyy-MM-dd")]
        DateTime? Birthday { get; set; }
    }
}