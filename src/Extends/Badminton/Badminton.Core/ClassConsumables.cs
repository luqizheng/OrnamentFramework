using Qi.Domain;

namespace Badminton
{
    /// <summary>
    /// 类别，如羽毛球，羽毛球拍
    /// </summary>
    public class ClassConsumables : DomainObject<ClassConsumables, int>
    {
        /// <summary>
        /// 
        /// </summary>
        public virtual string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Name;
        }
    }
}