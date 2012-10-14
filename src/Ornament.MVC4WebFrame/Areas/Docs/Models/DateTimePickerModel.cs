using System;
using System.Collections.Generic;
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
        public DateTime Now { get; set; }

        public Time TimeNow { get; set; }
    }
}