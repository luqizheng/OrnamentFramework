using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    

    public abstract class GenericSaveSqlExecuteItem<T> :
        SaveSqlExecuteItem where T : SqlExecuteItem
    {
        protected GenericSaveSqlExecuteItem(DataHelper helper, string tableName)
            : base(helper, tableName)
        {
        }

        public new T Values(params object[][] values)
        {
            return (T)base.Values(values);
        }

        public T Value(object[] values)
        {
            return (T)base.Values(new object[] { values });
        }

        public T Value(CreateValue handler)
        {
            return this.Value(handler.Invoke());
        }


        public new T ForeignKeyFrom(string fkColumnName, CreatePrimaryKey builder)
        {
            return (T)base.ForeignKeyFrom(fkColumnName, builder);
        }

        public T PrimaryKeyFor(CreateForeignKey childForeignKey)
        {
            return (T)base.PrimaryKeyFor(childForeignKey);
        }

        public new T Columns(params string[] fieldName)
        {
            return (T)base.Columns(fieldName);
        }

        public new T Columns(string fieldName, char splitSymbol)
        {
            return (T)base.Columns(fieldName, splitSymbol);
        }

        public new T ForgineKey(params ForeignKey[] key)
        {
            return (T)base.ForgineKey(key);
        }
    }
}