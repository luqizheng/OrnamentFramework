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
            Phone = user.Phone;
            Name = user.Name;
            Remark = user.Remark;
        }

        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof (MembershipCommon))]
        public string Phone { get; set; }

        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Name { get; set; }

        [UIHint("Textarea")]
        [Display(Name = "Remark", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Remark { get; set; }

        public void UpdateOn(User user)
        {
            user.Remark = Remark;
            user.Name = Name;
            user.Phone = Phone;
        }
    }
}