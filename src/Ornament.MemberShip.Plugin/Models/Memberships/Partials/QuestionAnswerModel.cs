using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class QuestionAnswerModel
    {
        /// <summary>
        /// </summary>
        [Display(Name = "PasswordQuestion", ResourceType = typeof(Properties.Resources)),
         Required(AllowEmptyStrings = false,
             ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof (ErrorMessage))]
        public string PasswordQuestion { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "PasswordAnswer", ResourceType = typeof(Properties.Resources)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
             ErrorMessageResourceType = typeof (ErrorMessage)),
         StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string PasswordAnswer { get; set; }
    }
}