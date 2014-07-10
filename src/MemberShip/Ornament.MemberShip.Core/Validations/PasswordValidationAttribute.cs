using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.Validations
{
    /// <summary>
    ///     ʹ��
    ///     membership defaultProvider="OrnamentProvider"
    ///     minRequiredPasswordLength
    /// </summary>
    public class PasswordValidationAttribute : RegularExpressionAttribute
    {
        public PasswordValidationAttribute()
            : base(User.ValidateUserPolicy.PasswordStrengthRegularExpression)
        {
        }

        public override string FormatErrorMessage(string name)
        {
            return string.Format(Resources.alertPassword_CharError, User.ValidateUserPolicy.MinRequiredPasswordLength);
        }
    }
}