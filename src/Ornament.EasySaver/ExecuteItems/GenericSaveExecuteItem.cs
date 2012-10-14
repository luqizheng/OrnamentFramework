namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// create execute item.
    /// </summary>
    /// <param name="helper">
    /// The helper.
    /// </param>
    public delegate ForeignKey CreateForeignKey(DataHelper helper);

    public delegate PrimaryKey CreatePrimaryKey(DataHelper helper);

    public abstract class GenericSaveExecuteItem<T> : SaveExecuteItem where T : ExecuteItem
    {
        protected GenericSaveExecuteItem(DataHelper helper, string tableName) : base(helper, tableName)
        {
        }

        public new T Values(params object[][] values)
        {
            return (T) base.Values(values);
        }

        public new T ForeignKeyFrom(string fkColumnName, CreatePrimaryKey builder)
        {
            return (T) base.ForeignKeyFrom(fkColumnName, builder);
        }

        public new T PrimaryKeyFor(CreateForeignKey childForeignKey)
        {
            return (T) base.PrimaryKeyFor(childForeignKey);
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