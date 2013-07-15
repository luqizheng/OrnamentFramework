using System.ComponentModel.DataAnnotations;

namespace Ornament.Validations
{
    public class JqStepAttribute : ValidationAttribute
    {
        public JqStepAttribute(double step)
        {
            this.Step = step;
        }
        public double Step { get; set; }

        public override bool IsValid(object value)
        {
            return true;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            return ValidationResult.Success;
        }
    }

}
