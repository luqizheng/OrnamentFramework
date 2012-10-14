namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public abstract class GenericExecuteItem<T> : ExecuteItem where T : ExecuteItem
    {
        protected GenericExecuteItem(DataHelper helper, string tableName)
            : base(helper, tableName)
        {
        }


        public T Values(params object[] values)
        {
            return (T) base.Values(values);
        }

        public new T Columns(params string[] fieldName)
        {
            return (T) base.Columns(fieldName);
        }

        public new T Columns(string fieldName, char splitSymbol)
        {
            return (T) base.Columns(fieldName, splitSymbol);
        }

        public new T ForgineKey(params ForeignKey[] key)
        {
            return (T) base.ForgineKey(key);
        }
    }
}