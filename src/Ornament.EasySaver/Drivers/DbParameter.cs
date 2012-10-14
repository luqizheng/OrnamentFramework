using System.Collections.Generic;
using System.Data;

namespace Ornament.EasySqlExecuter.Drivers
{
    public class DbParameter
    {
        private List<Value> _values;

        public DbParameter(string name)
        {
            Name = name;
        }

        public string Name { get; set; }

        public List<Value> Values
        {
            get { return _values ?? (_values = new List<Value>()); }
        }

        /// <summary>
        /// Auto cach
        /// </summary>
        /// <param name="command"></param>
        /// <param name="databaseType"></param>
        /// <returns></returns>
        internal IDbDataParameter CreateParameter(IDbCommand command, DatabaseType databaseType)
        {
            IDbDataParameter result = command.CreateParameter();
            result.ParameterName = databaseType == DatabaseType.SqlServer ? "@" + Name : ":" + Name;
            command.Parameters.Add(result);
            return result;
        }

        internal string CreateParameterName(DatabaseType type)
        {
            return type == DatabaseType.SqlServer ? "@" + Name : ":" + Name;
        }
    }
}