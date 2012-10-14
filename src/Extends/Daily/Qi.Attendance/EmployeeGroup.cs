using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public class EmployeeGroup : DomainObject<EmployeeGroup, Guid>
    {
        private Iesi.Collections.Generic.ISet<Equipment> _equipments;
        private EmployeeGroupOption _options;

        /// <summary>
        /// Gets the Name of EmployeeGroup 
        /// </summary>
        [Display(Name = "名称"), Required(AllowEmptyStrings = false, ErrorMessage = "请输入名称")]
        public virtual string Name { get; set; }

        /// <summary>
        /// Gets or sets the Remakrs 
        /// </summary>
        [Display(Name = "备注")]
        public virtual string Remark { get; set; }

        /// <summary>
        /// Gets the equpments 
        /// </summary>
        public virtual Iesi.Collections.Generic.ISet<Equipment> Equipments
        {
            get { return _equipments ?? (_equipments = new Iesi.Collections.Generic.HashedSet<Equipment>()); }
        }

        public virtual EmployeeGroupOption Options
        {
            get { return _options ?? (_options = new EmployeeGroupOption()); }
        }

        public override string ToString()
        {
            return Name;
        }
    }
}