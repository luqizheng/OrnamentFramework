using System.ComponentModel.DataAnnotations;

namespace Ornament.MemberShip.Plugin.Models
{
    public class VerifyCodeRequireAttribute : RequiredAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (OrnamentContext.Configuration.ApplicationSetting.EnableVerifyCode)
                return base.IsValid(value, validationContext);
            return ValidationResult.Success;
        }
    }
}