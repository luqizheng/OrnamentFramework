﻿using System.Web.Mvc;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Validations;
using Qi.Domain.Attributes;
using Qi.Web.Mvc.ClientValidations.Adapters;

namespace WebApplication.App_Start
{
    public class ValidationConfig
    {
        public static void Registry()
        {
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (PasswordValidationAttribute),
                typeof (RegularExpressionAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (VerifyCodeRequireAttribute),
                typeof (RequiredAttributeAdapter));
            //新的Attribute，用于JquerUI spinner控件一起用
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof (DateRangeAttribute),
                typeof (DateRangeAdapter));
            
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(QiRangeAttribute),
                typeof(QiRangeAttributeAdapter));
        }
    }
}