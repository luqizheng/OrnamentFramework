using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MvcSiteMapProvider;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class BasicInfo
    {
        private string _email;
        private string _phone;
        private string _name;

        public BasicInfo()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <exception cref="ArgumentNullException">input user is null</exception>
        public BasicInfo(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");
            Id = user.Id;
            Name = user.Name;
            TimeZoneId = user.TimeZoneId;
            Language = user.Language;
            LoginId = user.LoginId;
            Phone = user.Contact.Phone ?? "";
            Email = user.Contact.Email ?? "";

            VerifyEmail = true;
        }

        /// <summary>
        ///     Gets or sets the User's Id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     Gets or sets the LoginId,
        /// 检查LoginiId是否重复的用 Remote
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof(Resources))]
        [Required(ErrorMessageResourceName = "error_MissLoginId",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [RegularExpression(@"^[a-zA-Z0-9_-]{3,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof(Resources))]
        [UIHint("String")]
        [Remote("NotDuplicate", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceName = "alertMsg_duplicate_loginId",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        public string LoginId { get; set; }


        /// <summary>
        ///     Gets or sets the Email of user.
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof(Resources))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof(Resources))]
        [DataType(DataType.EmailAddress)]
        [UIHint("String")]
        [Remote("NotDuplicateEmail", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceType = typeof(Properties.Resources),
            ErrorMessageResourceName = "alertMsg_duplicate_Email")]
        public string Email
        {
            get { return _email; }
            set
            {
                if (value != null)
                    value = value.Trim();
                _email = value;
            }
        }

        /// <summary>
        /// </summary>
        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof(Resources))]
        public string Phone
        {
            get { return _phone; }
            set
            {
                if (value != null)
                    value = value.Trim();
                _phone = value;
            }
        }

        /// <summary>
        /// </summary>
        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof(Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof(Resources))]
        public string Name
        {
            get { return _name; }
            set
            {
                if (value != null)
                    value = value.Trim();
                _name = value;
            }
        }

        /// <summary>
        /// </summary>
        [UIHint("TimeZone")]
        [Display(Name = "TimeZone", ResourceType = typeof(Resources))]
        public string TimeZoneId { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "VerifyEmail", ResourceType = typeof(Properties.Resources))]
        public bool VerifyEmail { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("Language")]
        [Display(Name = "Language", ResourceType = typeof(Resources))]
        public string Language { get; set; }

        public bool EmailHasChanged { get; private set; }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        public void UpdateOn(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");
            user.Name = Name;
            user.TimeZoneId = TimeZoneId;
            user.Language = Language;
            EmailHasChanged = user.Contact.Email != Email;
            user.Contact.Email = Email;
            user.Contact.Phone = Phone;


        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        protected virtual void SendVerifyEmail(User user, IMemberShipFactory _daFactory)
        {
            VerifyEmailModel model = new VerifyEmailModel();
            model.Id = user.Id;
            model.Send(_daFactory);
        }
    }
}