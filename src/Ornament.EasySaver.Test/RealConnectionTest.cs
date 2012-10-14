using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.Test
{
    public class SqlConsole : IDriver
    {
        public IList<IList<DbParameter>> ParametersSet = new List<IList<DbParameter>>();
        public IList<string> Sqls = new List<string>();
        public Dictionary<string, Table> TableNameMapple = new Dictionary<string, Table>();

        public SqlConsole()
        {
            CommandIndex = 0;
        }

        public DatabaseType Type
        {
            get { return DatabaseType.SqlServer; }
        }

        public int CommandIndex { get; set; }

        #region IDriver Members

        public IDbConnection Connection
        {
            get { return new SqlConnection(); }
        }

        public bool Transcations { get; set; }
        DatabaseType IDriver.DatabaseType { get; set; }

        public IDbConnection Open()
        {
            return Connection;
        }

        public void Close(bool hasError)
        {
        }


        public List<object> ExecuteScalar(string sql, IList<DbParameter> noValueParameters)
        {
            var result = new List<object>();
            if (sql.Contains("IDENT_CURRENT"))
            {
                for (int index = 0; index < noValueParameters[0].Values.Count; index++)
                {
                    result.Add(index);
                }
            }
            Sqls.Add(sql);
            ParametersSet.Add(noValueParameters);

            return result;
        }

        public IList<int> ExecuteNonQuery(string sql, IList<DbParameter> noValueParameters)
        {
            Sqls.Add(sql);
            ParametersSet.Add(noValueParameters);
            return new List<int>();
        }

        public void ExecuteReader(string sql, IList<DbParameter> dataParameters, ExecuteReaderHandler readerHandler)
        {
            Sqls.Add(sql);
            ParametersSet.Add(dataParameters);
        }

        #endregion

        public void ExecuteNonQuery(string sql)
        {
            Sqls.Add(sql);
            ParametersSet.Add(new List<DbParameter>());
        }

        public IDataReader ExecuteReader(string sql)
        {
            Sqls.Add(sql);
            ParametersSet.Add(new List<DbParameter>());
            return null;
        }
    }
}