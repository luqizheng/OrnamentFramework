using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter
{
    /// <summary>
    /// ����һ�е�����
    /// </summary>
    public class RowDataValue : Collection<DataValue>
    {
        public int Row { get; internal set; }
    }
}