using System;
using System.ComponentModel.DataAnnotations;
using Qi;
using Qi.Domain.Attributes;

namespace DeveloperHelperCenter.Areas.Develop.Models
{
    public class BasicEditors
    {
        public BasicEditors()
        {
            Int32 = 6;
            Int64 = 1800;
            Date = DateTime.Now;
            Time=new Time(Date.Value.Hour,Date.Value.Minute,Date.Value.Second);
        }

        [Range(5, 20)]
        [Display(Name = "Int32 for editorTemplates", Description = "Int32 Description.")]
        public Int32 Int32 { get; set; }

        [QiRange(900D, 10000d, 100D)]
        public Int64 Int64 { get; set; }

        public string String { get; set; }

        [MaxLength(40)]
        [DataType(DataType.MultilineText)]
        public String Textarea { get; set; }

        [QiRange(10D, 15d, 0.2D)]
        public Decimal Decimal { get; set; }

        [QiRange(1D, 100d, 0.5D)]
        [DataType(DataType.Currency)]
        [UIHint("Currency")]
        public Decimal Money { get; set; }

        [DataType(DataType.Time)]
        public Time Time { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "yyyy-MM-dd")]
        [DateRange("-40y", "+10y", "yyyy-MM-dd", "yy-mm-dd")]
        public DateTime? Date { get; set; }
    }
}