using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     计量单位
    /// </summary>
    public class MeasurementUnit : DomainObject<MeasurementUnit, int>
    {
        private int _adecimal = 10;

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
        /// <param name="adecimal">10进制</param>
        public MeasurementUnit(string integerName, string decimalName, int adecimal)
        {
            IntegerName = integerName;
            DecimalName = decimalName;
            _adecimal = adecimal;
        }

        /// <summary>
        /// </summary>
        [DisplayName("小数名称")]
        public virtual string DecimalName { get; set; }

        /// <summary>
        /// </summary>
        [DisplayName("整数名称")]
        public virtual string IntegerName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [DisplayName("小数进位整数"), UIHint("Int32"), Range(1, 100)]
        public virtual int Adecimal
        {
            get { return _adecimal; }
            set { _adecimal = value; }
        }
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