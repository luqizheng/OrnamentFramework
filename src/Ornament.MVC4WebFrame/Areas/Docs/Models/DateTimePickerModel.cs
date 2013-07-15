using System;
using System.ComponentModel.DataAnnotations;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class DateTimePickerModel
    {
        public DateTimePickerModel()
        {
            Now = DateTime.Now;
            TimeNow = new Time(Now.Hour, Now.Minute, Now.Second);
        }

        [UIHint("Date")]
        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "dd/MM/yyyy")]
        public DateTime Now { get; set; }

        [UIHint("Date")]
        public DateTime? DefualtFormat { get; set; }

        [UIHint("Time")]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "HH:ss")]
        public Time TimeNow { get; set; }
    }
}