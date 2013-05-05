using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class UserOptionInformation
    {
        public UserOptionInformation()
        {

        }

        public UserOptionInformation(User user)
        {
            this.Phone = user.Phone;
            this.Name = user.Name;
            this.Remark = user.Remark;
        }
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
