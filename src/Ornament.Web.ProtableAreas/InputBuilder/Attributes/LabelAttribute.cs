using System.ComponentModel.DataAnnotations;

namespace Ornament.Web.InputBuilder.Attributes
{
    public class LabelAttribute : ValidationAttribute
    {
        public LabelAttribute(string label)
        {
            Label = label;
        }

        public string Label { get; private set; }

        public override bool IsValid(object value)
        {
            return true;
        }
    }
}