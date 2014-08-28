using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Validations;

namespace Ornament.MemberShip
{
    public interface IUserSystemSetting
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

        /// <summary>
        ///     Gets or sets Deny, if set to True, user can't be access
        /// </summary>
        [Display(Name = "error_UserIsDeny", ResourceType = typeof (Resources))]
        bool IsDeny { get; set; }
    }

    public interface IUserOptionInfo
    {
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
    }
}