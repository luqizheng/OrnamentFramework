using System;
using System.Collections.Generic;
using System.Data;

namespace Ornament.EasySqlExecuter.Drivers
{
    public class DbDriver : IDriver
    {
        private IDbTransaction _trans;

        protected DbDriver()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlServerDriver"/> class.
        /// </summary>
        public DbDriver(IDbConnection connection, DatabaseType databaseType)
        {
            Connection = connection;
            DataBaseType = databaseType;
        }

        public DatabaseType DataBaseType { get; set; }

        #region IDriver Members

        /// <summary>
        /// Gets Connection.
        /// </summary>
        public virtual IDbConnection Connection { get; private set; }

        public DatabaseType DatabaseType { get; set; }

        public virtual IDbConnection Open()
        {
            if (Connection.State == ConnectionState.Closed)
            {
                if (Transcations)
                    _trans = Connection.BeginTransaction();
                Connection.Open();
            }

            return Connection;
        }

        public virtual void Close(bool hasError)
        {
            if (_trans != null)
            {
                if (hasError)
                    _trans.Rollback();
                else
                    _trans.Commit();
            }
            Connection.Close();
        }

        public bool Transcations { get; set; }



        public List<object> ExecuteScalar(string sql, IList<DbParameter> valueParameters)
        {
            var result = new List<object>();
            var command = CreateCommand(sql, valueParameters);
            for (int i = 0; i < valueParameters[0].Values.Count; i++)
            {
                foreach (var param in valueParameters)
                {
                    var pa = (IDbDataParameter)command.Parameters[param.Name];
                    pa.Value = param.Values[i];
                }
                result.Add(command.ExecuteScalar());
            }
            return result;
        }

        public void ExecuteReader(string sql, IList<DbParameter> dataParameters, ExecuteReaderHandler readerHandler)
        {
            IDbCommand command = CreateCommand(sql, dataParameters);
            for (int i = 0; i < dataParameters[0].Values.Count; i++)
            {
                foreach (var param in dataParameters)
                {
                    var pa = (IDbDataParameter)command.Parameters[param.Name];
                    pa.Value = param.Values[i];
                }
                using (var reader = command.ExecuteReader())
                {
                    readerHandler(reader);
                }
            }
        }

        /// <summary>
        /// execute non query.
        /// </summary>
        /// <param name="sql">
        ///   The sql.
        /// </param>
        /// <param name="noValueParameters">
        ///   The no value parameters.
        /// </param>
        /// <exception cref="ArgumentException">
        /// </exception>
        public IList<int> ExecuteNonQuery(string sql, IList<DbParameter> noValueParameters)
        {
            IList<int> result = new List<int>();
            IDbCommand command = CreateCommand(sql, noValueParameters);
            for (int i = 0; i < noValueParameters[0].Values.Count; i++)
            {
                foreach (var param in noValueParameters)
                {
                    var pa = (IDbDataParameter)command.Parameters[param.Name];
                    pa.Value = param.Values[i];
                }
                result.Add(command.ExecuteNonQuery());
            }
            return result;
        }

        #endregion

        private IDbCommand CreateCommand(string sql)
        {
            IDbCommand result = Connection.CreateCommand();
            result.CommandText = sql;
            if (_trans != null)
                result.Transaction = _trans;
            return result;
        }


        private IDbCommand CreateCommand(string sql, IEnumerable<DbParameter> datas)
        {
            IDbCommand result = CreateCommand(sql);
            foreach (DbParameter a in datas)
            {
                result.Parameters.Add(a.CreateParameter(result, DatabaseType));
            }

            return result;
        }
    }
}