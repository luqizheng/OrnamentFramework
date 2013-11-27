using System;
using System.ComponentModel.DataAnnotations;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Doc.Models
{
    public class ExtenderTypeModel
    {
        public ExtenderTypeModel()
        {
           
        }
        [UIHint("Time")]
        public Time? TimeNow { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "HH:mm")]
        public TimePeriod Period { get; set; }
        

    }
}