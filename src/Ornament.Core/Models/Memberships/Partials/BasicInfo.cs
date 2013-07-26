using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Properties;

namespace Ornament.Models.Memberships.Partials
{
    public class BasicInfo : MemberInfo
    {
        public BasicInfo()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        public BasicInfo(User user)
        {
            Name = user.Name;
            Phone = user.Contact.Phone;
            Email = user.Contact.Email;
            TimeZoneId = user.TimeZoneId;
            Language = Language;
            VerifyEmail = true;
        }

        /// <summary>
        /// </summary>
        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof (Resources))]
        public string Phone { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof (Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("TimeZone")]
        public string TimeZoneId { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "VerifyEmail", ResourceType = typeof (Resources))]
        public bool VerifyEmail { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Language", ResourceType = typeof (Resources))]
        public string Language { get; set; }

        public bool EmailHasChanged { get; private set; }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        public virtual void UpdateOn(User user)
        {
            user.Name = Name;
            user.Contact.Phone = Phone;
            user.TimeZoneId = TimeZoneId;
            EmailHasChanged = user.Contact.Email != Email;
            user.Contact.Email = Email;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        protected virtual void SendVerifyEmail(User user)
        {
            MemberSecrityManager token = MemberSecrityManager.CreateEmailChangedToken(user,
                                                                                      OrnamentContext
                                                                                          .Configuration
                                                                                          .ApplicationSetting
                                                                                          .VerifyEmailTimeout);
            token.SendToken();
        }
    }
}