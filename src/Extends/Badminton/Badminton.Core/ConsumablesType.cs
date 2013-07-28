namespace Badminton
{
    public enum ConsumablesType
    {
        /// <summary>
        ///     虚拟消耗品。使用加权平均进行计算
        /// </summary>
        Virtual,

        /// <summary>
        ///     物理。每次入货后到创建新的消耗品
        /// </summary>
        Physical,
    }
}