using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Properties;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShip
{
    public partial class User
    {
        public class SecurityInfo : DomainObject<SecurityInfo, string>
        {
            private string _password;
            private string _passwordAnswer;
            private string _passwordQuestion;

            internal  protected SecurityInfo()
            {
                
            }
            internal SecurityInfo(User user)
            {
                if (user == null) throw new ArgumentNullException("user");
                User = user;
            }

            /// <summary>
            ///     获取用户最后改变时间
            /// </summary>
            [Display(Name = "LastPasswordChangedTime", ResourceType = typeof (Resources))]
            public virtual DateTime? LastPasswordChangedDate { get; set; }

            /// <summary>
            ///     获取用户最后登录时间
            /// </summary>
            [Display(Name = "LastLoginTime", ResourceType = typeof (Resources))]
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
            [Display(Name = "PasswordQuestion", ResourceType = typeof (Resources)),
             Required(AllowEmptyStrings = false,
                 ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof (ErrorMessage))
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
            [Display(Name = "PasswordAnswer", ResourceType = typeof (Resources)),
             Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
                 ErrorMessageResourceType = typeof (ErrorMessage)),
             StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
                 ErrorMessageResourceType = typeof (ErrorMessage))]
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
            [Display(Name = "Password", ResourceType = typeof (Resources)),
             Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePassword",
                 ErrorMessageResourceType = typeof (ErrorMessage))]
            public virtual string Password
            {
                get { return MembershipContext.Provider.Decrypt(_password); }
            }

            /// <summary>
            ///     该用户是否能够登录
            /// </summary>
            /// <param name="inputPassword">
            /// </param>
            /// <returns>
            /// </returns>
            public virtual bool ValidateUser(string inputPassword)
            {
                if (String.IsNullOrEmpty(inputPassword))
                {
                    throw new ArgumentNullException("inputPassword");
                }

                if (User.IsLockout)
                {
                    throw new MemberShipException("User is locked");
                }

                if (!User.IsApproved)
                {
                    throw new MemberShipException("User isn't approved");
                }

                if (MembershipContext.Provider.Encrypt(inputPassword) == Password)
                {
                    LastLoginDate = DateTime.Now;
                    return true;
                }

                return false;
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
                _password = MembershipContext.Provider.Encrypt(newPassword);
                if (!this.IsTransient())
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
                if (MembershipContext.Provider.Encrypt(oldPassword) == Password)
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
        }
    }
}