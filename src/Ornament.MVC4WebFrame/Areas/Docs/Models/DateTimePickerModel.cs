using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Qi;

namespace Ornament.MVCWebFrame.Areas.Docs.Models
{
    public class DateTimePickerModel
    {
        public DateTimePickerModel()
        {
            Now = DateTime.Now;
            this.TimeNow=new Time(Now.Hour,Now.Minute,Now.Second);
        }
        [UIHint("Date")]
        public DateTime Now { get; set; }

        [UIHint("Time")]
        public Time TimeNow { get; set; }
    }
}