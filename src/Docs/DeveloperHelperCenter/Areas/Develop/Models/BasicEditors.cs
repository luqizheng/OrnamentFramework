using System;
using System.ComponentModel.DataAnnotations;
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
        }

        [Range(5, 20)]
        public Int32 Int32 { get; set; }

        [QiRange(900D, 10000d, 100D)]
        public Int64 Int64 { get; set; }

        public string String { get; set; }
        public String Textarea { get; set; }

        [QiRange(10D, 15d, 0.2D)]
        public Decimal Decimal { get; set; }
        
        [DataType(DataType.DateTime)]
        public DateTime DateTime { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "yyyy/MM/dd")]
        [DateRange("1940-01-01", "2014-12-31", "yyyy-MM-dd", "yy/mm/dd")]
        public DateTime? Date { get; set; }
    }
}