using System;
using System.ComponentModel.DataAnnotations;

namespace Qi.Attendance
{
    public class Period
    {
        [Display(Name = "��ʼʱ��"), Required(ErrorMessage = "�����뿪ʼʱ��")]
        public virtual Time StartTime { get; set; }

        [Display(Name = "����ʱ��"), Required(ErrorMessage = "���������ʱ��")]
        public virtual Time EndTime { get; set; }

        [Display(Name = "��ע")]
        public virtual string Remarks { get; set; }

        public virtual bool IsIn(DateTime time)
        {
            var a = new Time(time.Hour, time.Minute, time.Second, time.Millisecond);

            return a >= StartTime && a <= EndTime;
        }

        public override string ToString()
        {
            return StartTime.ToString("HH:mm") + "~" + EndTime.ToString("HH:mm");
        }
    }
}