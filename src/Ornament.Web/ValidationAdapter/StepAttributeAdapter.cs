using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Validations;

namespace Ornament.Web.ValidationAdapter
{
    public class StepAttributeAdapter : DataAnnotationsModelValidator<JqStepAttribute>
    {
        public StepAttributeAdapter(ModelMetadata metadata, ControllerContext context, JqStepAttribute attribute)
            : base(metadata, context, attribute)
        {
        }

        public override IEnumerable<ModelClientValidationRule> GetClientValidationRules()
        {
            string errorMessage = ErrorMessage;
            return new[] {new StepModelClientValidationRule(errorMessage, Attribute.Step)};
        }
    }

    public class StepModelClientValidationRule : ModelClientValidationRule
    {
        public StepModelClientValidationRule(string errorMessage, object step)
        {
            ErrorMessage = errorMessage;
            ValidationType = "step";
            ValidationParameters["step"] = step;
        }
    }
}