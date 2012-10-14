using System;
using System.ComponentModel.DataAnnotations;

namespace Qi.Attendance
{
    public class Period
    {
        [Display(Name = "开始时间"), Required(ErrorMessage = "请输入开始时间")]
        public virtual Time Start { get; set; }

        [Display(Name = "结束时间"), Required(ErrorMessage = "请输入结束时间")]
        public virtual Time End { get; set; }

        [Display(Name = "备注")]
        public virtual string Remarks { get; set; }

        public virtual bool IsIn(DateTime time)
        {
            var a = new Time(time.Hour, time.Minute, time.Second, time.Millisecond);

            return a >= Start && a <= End;
        }

        public override string ToString()
        {
            return Start.ToString("HH:mm") + "~" + End.ToString("HH:mm");
        }
    }
}