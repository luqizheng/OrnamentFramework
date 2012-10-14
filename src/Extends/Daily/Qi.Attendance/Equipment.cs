using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public class Equipment : DomainObject<Equipment, Guid>
    {
        [Display(Name = "终端号"), StringLength(64, ErrorMessage = "设备终端号不能大于64长度"), Required(ErrorMessage = "请填写设备终端号")]
        public virtual string TerminalId { get; set; }

        [Display(Name = "备注"), StringLength(200, ErrorMessage = "备注不能大于200长度")]
        public virtual string Remark { get; set; }
    }
}