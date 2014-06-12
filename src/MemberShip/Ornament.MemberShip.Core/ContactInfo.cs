﻿using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Security;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public partial class User
    {
        public class ContactInfo : DomainObject<ContactInfo, string>
        {
            private string _email;
            private bool _emailVerified;
            private string _phone;

            protected ContactInfo()
            {
            }

            protected internal ContactInfo(User user)
            {
                User = user;
            }

            public virtual User User { get; protected set; }

            /// <summary>
            ///     Gets or sets Phone.
            /// </summary>
            /// <value>
            ///     The phone.
            /// </value>
            [Display(Name = "Phone",
                ResourceType = typeof(Resources)),
             StringLength(30)]
            public virtual string Phone
            {
                get { return _phone; }
                set
                {
                    if (_phone != string.Empty)
                    {
                        User.ModifyUpdateTime();
                    }
                    _phone = value;
                }
            }

            /// <summary>
            ///     Gets or sets Email.
            /// </summary>
            /// <value>
            ///     The email.
            /// </value>
            [DataType(DataType.EmailAddress, ErrorMessageResourceName = "EmailNotRightFormat",
                ErrorMessageResourceType = typeof(Resources)),
             Display(Name = "Email", ResourceType = typeof(Resources)),
             RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
                 ErrorMessageResourceName = "EmailNotRightFormat", ErrorMessageResourceType = typeof(Resources))]
            [MaxLength(64)]
            public virtual string Email
            {
                get { return _email; }
                set
                {
                    if (!String.IsNullOrEmpty(User.Id))
                    {
                        User.ModifyUpdateTime();
                    }
                    _email = value;
                }
            }

            public virtual bool EmailVerified
            {
                get { return _emailVerified && !String.IsNullOrEmpty(Email); }
                set { _emailVerified = value; }
            }

            public virtual bool PhoneVerified { get; set; }

            /// <summary>
            ///     Veirfy Email
            /// </summary>
            /// <param name="expireMiniutes"></param>
            /// <param name="daoFactory"></param>
            /// <returns></returns>
            public virtual EmailVerifier VerifyEmail(int expireMiniutes, IMemberShipFactory daoFactory)
            {
                var dao = daoFactory.CreateEmailVerifierDao();
                var result = dao.Get(this.User, VerifyType.Email);
                if (result != null)
                {
                    if (!result.IsTransient())
                    {
                        if (result.Status == SecretTokenStatus.Expire || result.Status == SecretTokenStatus.Success)
                        {
                            dao.SaveOrUpdate(result);
                        }
                        else
                        {
                            result = new EmailVerifier(User, expireMiniutes, VerifyType.Email);
                        }
                    }
                }
                dao.SaveOrUpdate(result);
                EmailVerified = false;
                return result;
            }
        }
    }
}