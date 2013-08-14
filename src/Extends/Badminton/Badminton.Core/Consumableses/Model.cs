using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Badminton.Consumableses
{
    /// <summary>
    /// </summary>
    public class Model : DomainObject<Model, int>
    {
        protected Model()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="brand"></param>
        /// <exception cref="ArgumentNullException">brand 输入为空</exception>
        public Model(Brand brand)
        {
            if (brand == null)
                throw new ArgumentNullException("brand");
            Brand = brand;
        }

        /// <summary>
        ///     前序，存放于名称前面
        /// </summary>
        public virtual string Prefix { get; set; }

        /// <summary>
        ///     存放于名称后面的
        /// </summary>
        [Required]
        public virtual string Suffix { get; set; }

        /// <summary>
        ///     型号名称
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     品牌
        /// </summary>
        [Required]
        public virtual Brand Brand { get; set; }

        /// <summary>
        ///     消耗品类型
        /// </summary>
        [UIHint("EnumRadio")]
        public virtual ConsumablesType ConsumablesType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual MeasurementUnit Unit { get; set; }
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Brand.Name + (Prefix ?? "") + (Name + Suffix ?? "");
        }
    }
}