using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class UserOptionInformation
    {
        [Display(Name = "Phone", ResourceType = typeof(MembershipCommon))]
        public string Phone { get; set; }

        [Display(Name = "Name", ResourceType = typeof(MembershipCommon)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof(ErrorMessage))]
        public string Name { get; set; }

        [Display(Name = "Remark", ResourceType = typeof(MembershipCommon)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof(ErrorMessage))]
        public string Remark { get; set; }
    }
}
