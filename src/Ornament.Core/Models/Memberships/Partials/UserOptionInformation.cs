using System;
using System.ComponentModel.DataAnnotations;
using MultiLanguage;
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
            Remark = user.Remarks;
         
        }

        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof(MemberShipModel))]
        public string Phone { get; set; }

        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof(MemberShipModel)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof(ErrorMessage))]
        public string Name { get; set; }

        [UIHint("Textarea")]
        [Display(Name = "Remark", ResourceType = typeof(MemberShipModel)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof(ErrorMessage))]
        public string Remark { get; set; }

        [UIHint("TimeZone")]
        public string TimeZone { get; set; }

        public void UpdateOn(User user)
        {
            user.Remarks = Remark;
            user.Name = Name;
            user.Phone = Phone;
           
        }
    }
}