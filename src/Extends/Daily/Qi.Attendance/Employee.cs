using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public enum EmployeeState
    {
        [EnumDescription("在职")]
        Employed,
        [EnumDescription("离职")]
        Dimission,
        
    }
    public class Employee : DomainObject<Employee, Guid>
    {
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "卡号"), Required(ErrorMessage = "请输入卡号.")]
        public virtual string CardNo { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "名称"), Required(ErrorMessage = "请输入雇员名称.")]
        [StringLength(30, ErrorMessage = "长度必须少于等于31")]
        public virtual string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "雇员分组")]
        public virtual EmployeeGroup EmployeeGroup { get; set; }

        [Display(Name="在职状态")]
        public virtual EmployeeState State { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("{0}({1}", Name, CardNo);
        }
    }
}