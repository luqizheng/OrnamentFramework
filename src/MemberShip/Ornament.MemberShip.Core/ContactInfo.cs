﻿using System;
using System.ComponentModel;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Qi.Domain;

namespace Ornament.MemberShip
{

    public partial class User
    {
        
        public class ContactInfo : DomainObject<ContactInfo, string>, IContactInfo
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
                Gender=MemberShip.GenderType.Unknown;
            }

            public virtual User User { get; protected set; }

            /// <summary>
            ///     Gets or sets Phone.
            /// </summary>
            /// <value>
            ///     The phone.
            /// </value>
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
            /// 国际冠码
            /// </summary>
            public virtual string InternationalPrefix { get; set; }
            
            public virtual string CityCode { get; set; }

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

            public virtual string FirstName { get; set; }

            public virtual string LastName { get; set; }

            public virtual DateTime? Birthday { get; set; }

            public virtual GenderType? Gender { get; set; }

            /// <summary>
            ///     Veirfy Email
            /// </summary>
            /// <param name="expireMiniutes"></param>
            /// <param name="daoDaoFactory"></param>
            /// <returns></returns>
            public virtual EmailVerifier VerifyEmail(int expireMiniutes, IMemberShipDaoFactory daoDaoFactory)
            {
                IUserSecurityTokenDao dao = daoDaoFactory.CreateEmailVerifierDao();
                var result = new EmailVerifier(User, expireMiniutes, VerifyType.Email);
                dao.SaveOrUpdate(result);
                EmailVerified = false;
                return result;
            }

            
        }


    }

    public enum GenderType
    {
        Unknown,
        male,
        female
    }
}