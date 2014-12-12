using System.Web.Mvc;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Validations;
using Qi.Domain.Attributes;

namespace WebApplication
{
    public class ValidationConfig
    {
        public void Registry()
        {
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (PasswordValidationAttribute),
                typeof (RegularExpressionAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (VerifyCodeRequireAttribute),
                typeof (RequiredAttributeAdapter));
            //新的Attribute，用于JquerUI spinner控件一起用
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (DateRangeAttribute),
                typeof (RangeAttributeAdapter));
        }
    }
}