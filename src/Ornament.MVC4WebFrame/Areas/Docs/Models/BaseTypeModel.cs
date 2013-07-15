using System.ComponentModel.DataAnnotations;
using Ornament.Validations;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class BaseTypeModel
    {
        public BaseTypeModel()
        {

        }
        public string StringType { get; set; }

        [UIHint("Textarea")]
        public string TextArea { get; set; }

        [Range(0, 200), JqStep(10)]
        public int IntType { get; set; }
        
        [Range(0.01, 1), JqStep(0.001)]
        public decimal DecimalType { get; set; }

    }
}