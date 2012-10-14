using System;
using Ornament.MemberShip;
using Qi.Domain;

namespace QiProject.Defects
{
    public class DefectComment : DomainObject<DefectComment, string>
    {
        private DateTime _createTime;
        /// <summary>
        /// 
        /// </summary>
        public virtual string Description { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual User Creater { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual DateTime CreateTime
        {
            get
            {
                if (_createTime == DateTime.MinValue)
                {
                    _createTime = DateTime.Now;
                }
                return _createTime;
            }
        }
    }
}