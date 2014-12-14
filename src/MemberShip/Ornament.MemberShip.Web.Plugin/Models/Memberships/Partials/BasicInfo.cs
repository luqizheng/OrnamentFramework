using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Web.Plugin.Properties;

namespace Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials
{
    public class BasicInfo : IUser, IContactInfo, IUserSetting
    {
        private string _email;
        private string _name;
        private string _phone;

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
            Birthday = user.Contact.Birthday;
            FirstName = user.Contact.FirstName;
            LastName = user.Contact.LastName;
            Org = user.Org;
            this.Gender = user.Contact.Gender;
        }

        public bool VerifyEmail { get; set; }
        public bool EmailHasChanged { get; set; }


        /// <summary>
        ///     Gets or sets the Email of user.
        /// </summary>
        [Remote("NotDuplicateEmail", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceType = typeof(Resources),
            ErrorMessageResourceName = "alertMsg_duplicate_Email")]
        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "Email")]
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

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "EmailVerified")]
        public bool EmailVerified { get; set; }

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "PhoneVerified")]
        public bool PhoneVerified { get; set; }

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "FirstName")]
        public string FirstName { get; set; }

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "LastName")]
        public string LastName { get; set; }

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "Birthday")]
        public DateTime? Birthday { get; set; }

        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "Phone")]
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
        [AttributeProvider("Ornament.MemberShip.IContactInfo,Ornament.MemberShip.Core", "Gender")]
        public GenderType? Gender { get; set; }

        /// <summary>
        /// </summary>
        [AttributeProvider("Ornament.MemberShip.IUser,Ornament.MemberShip.Core", "Name")]
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

        [AttributeProvider("Ornament.MemberShip.IUser,Ornament.MemberShip.Core", "Org"), UIHint("Org")]
        public Org Org { get; set; }

        /// <summary>
        ///     Gets or sets the User's Id
        /// </summary>
        public string Id { get; set; }

        ///// <summary>
        /////     Gets or sets the LoginId,
        /////     检查LoginiId是否重复的用 Remote
        ///// </summary>
        [Remote("NotDuplicate", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceName = "alertMsg_duplicate_loginId",
            ErrorMessageResourceType = typeof(Resources))]
        [AttributeProvider("Ornament.MemberShip.IUser,Ornament.MemberShip.Core", "LoginId")]
        public string LoginId { get; set; }

        [AttributeProvider("Ornament.MemberShip.IUserSetting,Ornament.MemberShip.Core", "TimeZoneId")]
        public string TimeZoneId { get; set; }

        [AttributeProvider("Ornament.MemberShip.IUserSetting,Ornament.MemberShip.Core", "Language")]
        public string Language { get; set; }

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

            if (EmailHasChanged)
            {
                user.Contact.EmailVerified = false;
            }

            user.Contact.Email = Email;
            user.Contact.Phone = Phone;

            user.Contact.Birthday = this.Birthday;
            user.Contact.FirstName = this.FirstName;
            user.Contact.LastName = this.LastName;

            user.Contact.Gender = this.Gender != null ? this.Gender.Value : GenderType.Unknown;

            user.Org = this.Org;

        }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        protected virtual void SendVerifyEmail(User user, IMemberShipDaoFactory daDaoFactory)
        {
            var model = new VerifyEmailModel { Id = user.Id };
            model.Send(daDaoFactory);
        }
    }
}