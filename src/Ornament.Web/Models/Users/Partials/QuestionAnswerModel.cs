using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;

namespace Ornament.Web.Models.Users.Partials
{
    public class QuestionAnswerModel
    {
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "PasswordQuestion", ResourceType = typeof(MembershipCommon)),
         Required(AllowEmptyStrings = false,
             ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof(ErrorMessage))]
        public string PasswordQuestion { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "PasswordAnswer", ResourceType = typeof(MembershipCommon)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
             ErrorMessageResourceType = typeof(ErrorMessage)),
         StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
             ErrorMessageResourceType = typeof(ErrorMessage))]
        public string PasswordAnswer { get; set; }
    }
}
