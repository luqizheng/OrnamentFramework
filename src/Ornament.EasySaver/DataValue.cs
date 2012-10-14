namespace Ornament.EasySqlExecuter
{
    public delegate void DataValueHandler(DataValue sender);

    /// <summary>
    /// executer中一个数据的实体
    /// </summary>
    public class DataValue
    {
        /// <summary>
        /// 当其他对象需要这个DataValue的数据的时候,就发生这个事件。
        /// </summary>
        public DataValueHandler GettingValueEvent;

        private object value;

        public DataValue()
        {
        }

        public DataValue(object value)
        {
            Value = value;
        }

        public object Value
        {
            get
            {
                if (GettingValueEvent != null)
                    GettingValueEvent(this);
                return value;
            }
            set { this.value = value; }
        }
    }
}