using System.Data;
using System.Data.SqlClient;

namespace Ornament.EasySqlExecuter.Drivers
{

    

    /// <summary>
    /// sql server driver.
    /// </summary>
    public class SqlServerDriver : DbDriver
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlServerDriver"/> class.
        /// </summary>
        /// <param name="connectionString">
        /// The connection string.
        /// </param>
        public SqlServerDriver(string connectionString)
            : base(new SqlConnection(connectionString),DatabaseType.SqlServer)
        {
        }
    }
}