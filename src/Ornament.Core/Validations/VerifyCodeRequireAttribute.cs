using System.ComponentModel.DataAnnotations;

namespace Ornament.Validations
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