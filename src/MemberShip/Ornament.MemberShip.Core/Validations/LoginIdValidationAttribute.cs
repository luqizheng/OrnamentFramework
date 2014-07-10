using System.ComponentModel.DataAnnotations;

namespace Ornament.MemberShip.Validations
{
    public class LoginIdValidationAttribute : RegularExpressionAttribute
    {
        public LoginIdValidationAttribute()
            : base(@"^[a-zA-Z0-9_-]{1,20}")
        {
        }
    }
}