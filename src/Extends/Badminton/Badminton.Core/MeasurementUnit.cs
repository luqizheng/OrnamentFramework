using System.ComponentModel;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    /// 计量单位
    /// </summary>
    public class MeasurementUnit : DomainObject<MeasurementUnit, int>
    {
        /// <summary>
        ///     for Nhibernate mapping .
        /// </summary>
        protected MeasurementUnit()
        {
        }

        public MeasurementUnit(string integerName)
        {
            IntegerName = integerName;
        }

        /// <summary>
        /// </summary>
        /// <param name="integerName"></param>
        /// <param name="decimalName"></param>
        /// <param name="adecimal">精致</param>
        public MeasurementUnit(string integerName, string decimalName, int adecimal)
        {
            IntegerName = integerName;
            DecimalName = decimalName;
        }

        [DisplayName("小数名称")]
        public virtual string DecimalName { get; set; }

        [DisplayName("整形部分名称")]
        public virtual string IntegerName { get; set; }

        /// <summary>
        ///     根据单位输出显示部分
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        public virtual string ToExpress(decimal n)
        {
            return n.ToString("0.#").Replace(".", IntegerName) + (DecimalName ?? "");
        }
    }
}