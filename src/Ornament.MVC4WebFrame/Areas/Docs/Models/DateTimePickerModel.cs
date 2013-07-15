using System;
using System.ComponentModel.DataAnnotations;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class DateTimePickerModel
    {
        public DateTimePickerModel()
        {
            var Now = DateTime.Now;
            TimeNow = new Time(Now.Hour, Now.Minute, Now.Second);
        }
        [UIHint("Time")]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "HH:ss")]
        public Time TimeNow { get; set; }
    }
}