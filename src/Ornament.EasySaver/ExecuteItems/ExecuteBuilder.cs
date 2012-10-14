using System;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public class ExecuteBuilder
    {
        private readonly bool _invertExecuterOrder;
        private readonly IExecuteItem _parent;

        public ExecuteBuilder(IExecuteItem parent, IDriver driver, bool invertExecuterOrder)
        {
            if (parent == null)
                throw new ArgumentNullException("parent");
            _parent = parent;
            _invertExecuterOrder = invertExecuterOrder;
            Driver = driver;
        }

        public ExecuteBuilder(IExecuteItem parent, IDriver driver)
            : this(parent, driver, false)
        {
        }

        public IDriver Driver { get; set; }

        /// <summary>
        /// ExecuteAll all executeItem
        /// </summary>
        public void ExecuteAll()
        {
            _parent.Execute();
        }

        /// <summary>
        /// insert.
        /// </summary>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        /// <param name="key">
        /// The key.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public InsertSqlExecuteItem Insert(string tableName, PrimaryKey key)
        {
            if (key == null)
            {
                throw new ArgumentNullException("key");
            }
            InsertSqlExecuteItem result = _parent != null
                                              ? new InsertSqlExecuteItem(this, tableName, _parent)
                                              : new InsertSqlExecuteItem(this, tableName);
            if (_invertExecuterOrder)
                result.ExecuteOrder = _parent.ExecuteOrder >= 0 ? -1 : _parent.ExecuteOrder + -1;
            result.Table.PrimaryKey = key;
            return result;
        }

        /// <summary>
        /// insert.
        /// </summary>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        /// <returns>
        /// </returns>
        public InsertSqlExecuteItem Insert(string tableName)
        {
            InsertSqlExecuteItem result = _parent != null
                                              ? new InsertSqlExecuteItem(this, tableName, _parent)
                                              : new InsertSqlExecuteItem(this, tableName);
            if (_invertExecuterOrder)
                result.ExecuteOrder = _parent.ExecuteOrder >= 0 ? -1 : _parent.ExecuteOrder + -1;
            return result;
        }

        public IExecuteItem Select(string sql)
        {
            return new SelectExecuteItem(this, sql);
        }
    }
}