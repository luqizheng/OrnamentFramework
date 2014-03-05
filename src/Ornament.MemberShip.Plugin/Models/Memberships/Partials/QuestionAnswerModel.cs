using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class QuestionAnswerModel
    {
        /// <summary>
        /// </summary>
        [Display(Name = "PasswordQuestion", ResourceType = typeof(Ornament.MemberShip.Properties.Resources)),
         Required(AllowEmptyStrings = false,
             ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof(MemberShip.Properties.Resources))]
        public string PasswordQuestion { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "PasswordAnswer", ResourceType = typeof(Ornament.MemberShip.Properties.Resources)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
             ErrorMessageResourceType = typeof(Ornament.MemberShip.Properties.Resources)),
         StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
             ErrorMessageResourceType = typeof(MemberShip.Properties.Resources))]
        public string PasswordAnswer { get; set; }
    }
}