using System;
using Qi.Domain;

namespace Qi.Attendance
{
    public class AbsentApplication : DomainObject<AbsentApplication, string>
    {
        /// <summary>
        /// </summary>
        public Employee Employee { get; set; }

        /// <summary>
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        ///     if null,it means all day.
        /// </summary>
        public Period Period { get; set; }
    }
}