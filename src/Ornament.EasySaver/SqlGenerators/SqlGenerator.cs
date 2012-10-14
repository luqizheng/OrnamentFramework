using System.Collections.Generic;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.ExecuteItems;
using Ornament.EasySqlExecuter.SqlGenerators.SqlServer;

namespace Ornament.EasySqlExecuter.SqlGenerators
{
    public abstract class SqlGenerator
    {
        protected SqlGenerator(CommandType type)
        {
            Type = type;
        }

        public CommandType Type { get; private set; }

        public abstract string Generate(SqlExecuteItem table, out List<DbParameter> dataParameters);

        public static SqlGenerator GetSqlGenerator(CommandType type, DatabaseType databaseType)
        {
            switch (databaseType)
            {
                case DatabaseType.SqlServer:
                    return SqlServer(type);
            }
            return null;
        }

        private static SqlGenerator SqlServer(CommandType type)
        {
            switch (type)
            {
                case CommandType.Insert:
                    return new InsertSqlServer();
            }
            return null;
        }
    }
}