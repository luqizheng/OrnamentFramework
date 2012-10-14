using System.Collections.Generic;
using System.Data;
using Ornament.EasySqlExecuter.Drivers;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// 
    /// </summary>
    public class SelectExecuteItem : ExecuteItem
    {
        private readonly Dictionary<string, DbParameter> _parameters = new Dictionary<string, DbParameter>();
        private DataTable _table;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        public SelectExecuteItem(ExecuteBuilder helper, string sql)
            : base(helper)
        {
            Sql = sql;
        }

        public string Sql { get; set; }

        public SelectExecuteItem InputParameters(string[] dbParameterNames)
        {
            foreach (string name in dbParameterNames)
            {
                _parameters.Add(name, new DbParameter(name));
            }
            return this;
        }

        public SelectExecuteItem Values(string parameterName, params Value[] valueses)
        {
            _parameters[parameterName].Values.AddRange(valueses);
            return this;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataTable"></param>
        /// <returns></returns>
        public SelectExecuteItem Into(out DataTable dataTable)
        {
            _table = new DataTable();
            dataTable = _table;
            return this;
        }

        #region Overrides of ExecuteItem

        public override IExecuteItem Execute()
        {
            var handler = new ExecuteReaderHandler(Invoke);
            Helper.Driver.ExecuteReader(Sql, new List<DbParameter>(_parameters.Values), handler);
            return this;
        }

        private void Invoke(IDataReader datareader)
        {
            if (_table.Columns.Count == 0)
            {
                for (int i = 0; i < datareader.FieldCount; i++)
                {
                    string name = datareader.GetName(i);
                    _table.Columns.Add(name);
                }
            }
            while (datareader.Read())
            {
                DataRow row = _table.NewRow();
                for (int i = 0; i < _table.Columns.Count; i++)
                {
                    string name = _table.Columns[i].ColumnName;
                    row[name] = datareader[name];
                }
            }
        }

        #endregion
    }
}