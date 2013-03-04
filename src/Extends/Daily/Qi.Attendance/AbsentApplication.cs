using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public class AbsentApplication : DomainObject<AbsentApplication, string>
    {
        /// <summary>
        /// </summary>
        [Display(Name = "雇员")]
        public virtual Employee Employee { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "创建时间")]
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "请假时间")]
        public virtual DateTime Date { get; set; }

        /// <summary>
        ///     if null,it means all day.
        /// </summary>
        [Display(Name = "请假时段")]
        public virtual Period Period { get; set; }
    }
}