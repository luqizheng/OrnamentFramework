namespace Ornament.EasySqlExecuter
{
    public delegate void DataValueHandler(DataValue sender);

    /// <summary>
    /// executer��һ�����ݵ�ʵ��
    /// </summary>
    public class DataValue
    {
        /// <summary>
        /// ������������Ҫ���DataValue�����ݵ�ʱ��,�ͷ�������¼���
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