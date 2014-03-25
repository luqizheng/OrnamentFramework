using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Security;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip
{
    public partial class User
    {
        private static ValidateUserPolicy _validateUserPolicy;

        public static ValidateUserPolicy ValidateUserPolicy
        {
            get
            {
                if (_validateUserPolicy == null)
                    throw new EmailSecurityException("Please set the User.ValidateUserPolicy first.");
                return _validateUserPolicy;
            }
            set { _validateUserPolicy = value; }
        }

        public class SecurityInfo : DomainObject<SecurityInfo, string>
        {
            private string _password;
            private string _passwordAnswer;
            private string _passwordQuestion;

            protected internal SecurityInfo()
            {
            }

            internal SecurityInfo(User user)
            {
                if (user == null)
                {
                    throw new ArgumentNullException("user");
                }
                User = user;
            }

            /// <summary>
            ///     Gets or sets IsLockout.
            /// </summary>
            /// <value>
            ///     The is lockout.
            /// </value>
            [Display(Name = "IsLockout", ResourceType = typeof(Resources))]
            public virtual bool IsLocked
            {
                get
                {
                    if (!ValidateUserPolicy.EnabledPasswordAtteempts)
                        return false;
                    //如果最后锁定时间为空，那么一定是没有被锁定过，因此吧最后锁定时间设定为最后。
                    DateTime lastLockDateTime = LastLockoutDate ??
                                                (DateTime.Now.AddMinutes(
                                                    -(ValidateUserPolicy.PasswordAttemptWindow + 15)));

                    return
                        InvalidPasswordAttempts >= ValidateUserPolicy.MaxInvalidPasswordAttempts //是否大于尝试次数
                        && (ValidateUserPolicy.PasswordAttemptWindow == 0 || (DateTime.Now - lastLockDateTime).Minutes <= ValidateUserPolicy.PasswordAttemptWindow);
                    //如果少于锁定时间，那么是被锁定了。
                }
            }

            /// <summary>
            ///     获取用户被锁定的时间
            /// </summary>
            [Display(Name = "LastLockTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastLockoutDate { get; protected set; }

            /// <summary>
            ///     最经尝试Password的次数
            /// </summary>
            public virtual int InvalidPasswordAttempts { get; protected set; }

            /// <summary>
            ///     获取用户最后改变时间
            /// </summary>
            [Display(Name = "LastPasswordChangedTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastPasswordChangedDate { get; set; }

            /// <summary>
            ///     获取用户最后登录时间
            /// </summary>
            [Display(Name = "LastLoginTime", ResourceType = typeof(Resources))]
            public virtual DateTime? LastLoginDate { get; protected internal set; }

            /// <summary>
            /// </summary>
            public virtual User User { get; protected set; }

            /// <summary>
            ///     Gets PasswordQuestion.
            /// </summary>
            /// <value>
            ///     The password question.
            /// </value>
            [Display(Name = "PasswordQuestion", ResourceType = typeof(Resources)),
             Required(AllowEmptyStrings = false,
                 ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof(Resources))
            ]
            public virtual string PasswordQuestion
            {
                protected set
                {
                    User.ModifyUpdateTime();
                    _passwordQuestion = value;
                }
                get { return _passwordQuestion; }
            }

            /// <summary>
            ///     Gets the answer of <see cref="PasswordQuestion" />. It alwasy entrypted by md5
            /// </summary>
            [Display(Name = "PasswordAnswer", ResourceType = typeof(Resources)),
             Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
                 ErrorMessageResourceType = typeof(Resources)),
             StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
                 ErrorMessageResourceType = typeof(Resources))]
            public virtual string PasswordAnswer
            {
                protected set
                {
                    User.ModifyUpdateTime();
                    _passwordAnswer = value;
                }
                get { return _passwordAnswer; }
            }

            /// <summary>
            ///     Gets Password.
            /// </summary>
            /// <value>
            ///     The password.
            /// </value>
            [Display(Name = "Password", ResourceType = typeof(Resources)),
             Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePassword",
                 ErrorMessageResourceType = typeof(Resources))]
            public virtual string Password
            {
                get { return ValidateUserPolicy.Provider.Decrypt(_password); }
            }

            public virtual void Unlock()
            {
                InvalidPasswordAttempts = 0;
            }


            public virtual ValidateUserResult ValidateUser(string inputPassword, out string errorMessage)
            {
                if (String.IsNullOrEmpty(inputPassword))
                {
                    throw new ArgumentNullException("inputPassword");
                }
                if (User.IsDeny)
                {
                    errorMessage = Resources.error_UserIsDeny;
                    return ValidateUserResult.DenyUser;
                }

                if (IsLocked)
                {
                    errorMessage = Resources.error_UserIsLockout;
                    if (ValidateUserPolicy.EnabledPasswordAtteempts)
                    {
                        errorMessage += String.Format(Resources.error_UserIsLockout_retry_after_mins,
                                            ValidateUserPolicy.PasswordAttemptWindow);
                    }
                    else
                    {
                        errorMessage += "," + Resources.error_UserIsLockout_contact_administrator;
                    }
                    return ValidateUserResult.LockedUser;
                }


                ValidateUserResult result =
                    ValidateUserPolicy.ValidateUser(User, inputPassword, out errorMessage);
                switch (result)
                {
                    case ValidateUserResult.Success:
                        LastLoginDate = DateTime.Now;
                        InvalidPasswordAttempts = 0;
                        break;
                    case ValidateUserResult.InvalidatePasswordOrAccount:
                        InvalidPasswordAttempts += 1;
                        if (InvalidPasswordAttempts == ValidateUserPolicy.MaxInvalidPasswordAttempts)
                        {
                            LastLockoutDate = DateTime.Now;
                        }
                        break;
                }

                return result;
            }


            /// <summary>
            /// </summary>
            /// <param name="newPassword"></param>
            /// <exception cref="ArgumentNullException">Password is null or empty</exception>
            /// <exception cref="PasswordFormatException">ArgumentException's length is too short</exception>
            public virtual void ChangePassword(string newPassword)
            {
                if (String.IsNullOrEmpty(newPassword))
                {
                    throw new ArgumentNullException("newPassword");
                }
                if (newPassword.Length < 3)
                    throw new PasswordFormatException("newPassword's length is too short.");
                _password = ValidateUserPolicy.Provider.Encrypt(newPassword);
                if (!IsTransient())
                {
                    LastPasswordChangedDate = DateTime.Now;
                }
            }

            /// <summary>
            ///     set Question and Answer. This function always set answer never check old answer and question.
            /// </summary>
            /// <param name="answer">
            /// </param>
            /// <param name="question">
            /// </param>
            /// <exception cref="ArgumentNullException">
            ///     answer or question is null or empty
            /// </exception>
            public virtual void SetQuestionAndAnswer(string question, string answer)
            {
                if (String.IsNullOrEmpty(answer))
                {
                    throw new ArgumentNullException("answer");
                }

                if (String.IsNullOrEmpty(question))
                {
                    throw new ArgumentNullException("question");
                }
                PasswordAnswer = answer.Trim().Sha1Utf8().ToStringEx();
                PasswordQuestion = question.Trim();
            }

            /// <summary>
            ///     直接改变密码
            /// </summary>
            /// <param name="newPassword">
            /// </param>
            /// <param name="oldPassword">
            /// </param>
            /// <returns>
            /// </returns>
            public virtual bool ChangePassword(string newPassword, string oldPassword)
            {
                if (ValidateUserPolicy.Provider.Encrypt(oldPassword) == Password)
                {
                    ChangePassword(newPassword);
                    LastPasswordChangedDate = DateTime.Now;
                    return true;
                }
                return false;
            }


            /// <summary>
            /// </summary>
            /// <param name="answer">
            ///     The answer.
            /// </param>
            /// <returns>
            /// </returns>
            /// <exception cref="ArgumentNullException">
            ///     answer is null or
            /// </exception>
            public virtual bool AnswertIsCorrect(string answer)
            {
                if (String.IsNullOrEmpty(answer))
                {
                    throw new ArgumentNullException("answer");
                }

                return PasswordAnswer == answer.Sha1Utf8().ToStringEx();
                ;
            }

            /// <summary>
            /// </summary>
            /// <param name="answer">
            ///     The answer.
            /// </param>
            /// <param name="newPassword">
            ///     The new password.
            /// </param>
            /// <exception cref="ArgumentNullException">
            /// </exception>
            /// <exception cref="MemberShipPermissionException">
            /// </exception>
            public virtual void ChangePasswordByAnswer(string answer, string newPassword)
            {
                if (String.IsNullOrEmpty(answer))
                {
                    throw new ArgumentNullException("answer", "Password answer is requested");
                }

                if (PasswordAnswer == null)
                {
                    throw new MemberShipPermissionException("Password Answer of user is not setting");
                }

                if (PasswordAnswer == answer.Sha1Utf8().ToStringEx())
                {
                    _password = newPassword;
                    LastPasswordChangedDate = DateTime.Now;
                }
                else
                {
                    throw new MemberShipPermissionException("answer is not correct");
                }
            }

            public virtual void Lockout()
            {
                this.InvalidPasswordAttempts = ValidateUserPolicy.MaxInvalidPasswordAttempts;
                this.LastLockoutDate = DateTime.Now;
            }

            public virtual EmailVerifier ResetPassword(IMemberShipFactory daoFactory, int expireMiniutes)
            {
                if (daoFactory == null) throw new ArgumentNullException("daoFactory");
                if (expireMiniutes <= 0)
                    expireMiniutes = 30;
                EmailVerifier result = new EmailVerifier(this.User, expireMiniutes, VerifyType.ResetPassword);
                daoFactory.CreateEmailVerifierDao().SaveOrUpdate(result);
                return result;
            }
        }
    }
}