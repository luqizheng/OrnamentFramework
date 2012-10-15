using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Qi.Domain;

namespace Qi.Attendance
{
    public enum CardState
    {
        Normal,
        Cancel
    }
    public class Card:DomainObject<Card,string>
    {
        [Display(Name = "卡号")]
        public virtual string Number { get; set; }
        [Display(Name="卡状态")]
        public virtual CardState State { get; set; }
        [Display(Name="雇员")]
        public virtual Employee Employee { get; set; }
    }
}
