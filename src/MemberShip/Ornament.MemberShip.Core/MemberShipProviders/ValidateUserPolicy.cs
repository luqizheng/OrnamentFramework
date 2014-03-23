using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.MemberShipProviders
{
    /// <summary>
    ///     ����Ƿ�Ϊ��Ч�û��ķ���
    /// </summary>
    public class ValidateUserPolicy
    {
        public ValidateUserPolicy(IMemberShipProvider provider)
        {
            MaxInvalidPasswordAttempts = 5;
            PasswordAttemptWindow = 30;
            Provider = provider;
        }

        /// <summary>
        /// �Ƿ�����ʧЧPassword���Դ���ͳ�ƣ�Ϊ0ʱ��Ϊfalse
        /// </summary>
        public virtual bool EnabledPasswordAtteempts
        {
            get { return MaxInvalidPasswordAttempts != 0; }
        }
        /// <summary>
        /// </summary>
        public virtual IMemberShipProvider Provider { get; set; }

        /// <summary>
        /// </summary>
        public virtual int MaxInvalidPasswordAttempts { get; set; }

        /// <summary>
        /// </summary>
        public virtual int PasswordAttemptWindow { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <param name="inputPassword"></param>
        /// <param name="errorMessage">return error message </param>
        /// <returns></returns>
        public virtual ValidateUserResult ValidateUser(User user, string inputPassword, out string errorMessage)
        {
            errorMessage = null;

            if (Provider.Encrypt(inputPassword) != user.Security.Password)
            {
                errorMessage = Resources.error_LoginError;
                if (this.EnabledPasswordAtteempts)
                {
                    errorMessage += String.Format(Resources.error_login_remind_attempts, MaxInvalidPasswordAttempts - user.Security.InvalidPasswordAttempts);
                }
                if (user.Security.InvalidPasswordAttempts + 1 == this.MaxInvalidPasswordAttempts)
                {
                    errorMessage += "," + Resources.error_UserIsLockout;
                }
                return ValidateUserResult.InvalidatePasswordOrAccount;
            }

            return ValidateUserResult.Success;
            ;
        }
    }

    public enum ValidateUserResult
    {
        Success,
        DenyUser,
        MaxInValidatePasswordAttempt,
        InvalidatePasswordOrAccount,
        LockedUser
    }

}