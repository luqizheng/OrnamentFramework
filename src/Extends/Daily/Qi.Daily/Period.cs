using System;
using System.ComponentModel.DataAnnotations;

namespace Qi.Daily
{
    public class Period
    {
        [Display(Name = "��ʼʱ��"), Required(ErrorMessage = "�����뿪ʼʱ��")]
        public virtual Time Start { get; set; }

        [Display(Name = "����ʱ��"), Required(ErrorMessage = "���������ʱ��")]
        public virtual Time End { get; set; }

        [Display(Name = "��ע")]
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