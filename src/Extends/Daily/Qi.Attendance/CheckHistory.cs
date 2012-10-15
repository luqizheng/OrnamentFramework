using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public class CheckHistory : DomainObject<CheckHistory, string>
    {
        [Display(Name = "签到种类")]
        public virtual CheckType Type { get; set; }
        
        [Display(Name = "签到时间")]
        public virtual DateTime SignTime { get; set; }
         
        [Display(Name = "卡号"), Required(ErrorMessage = "请输入卡号.")]
        public virtual string CardNo { get; set; }
    }
}