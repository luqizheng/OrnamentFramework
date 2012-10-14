using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter
{
    /// <summary>
    /// 单表一行的数据
    /// </summary>
    public class RowDataValue : Collection<DataValue>
    {
        public int Row { get; internal set; }
    }
}