using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Validations;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class BaseTypeModel
    {
        public BaseTypeModel()
        {
            DecimalType = 0.01m;
            Now = DateTime.Now;
           
        }
        public string StringType { get; set; }

        [UIHint("Textarea")]
        public string TextArea { get; set; }

        [Range(0, 200), JqStep(10)]
        public int IntType { get; set; }
        
        [Range(0.01, 1), JqStep(0.001)]
        public decimal DecimalType { get; set; }


        [UIHint("DateTime")]
        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "dd/MM/yyyy")]
        public DateTime Now { get; set; }

        [UIHint("DateTime")]
        public DateTime? DefualtFormat { get; set; }
    }
}