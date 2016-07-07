using System.Data;

namespace Ornament.DbConnection
{
    public interface IConnectionProvider
    {
        string ParameterPrefix { get; set; }
        IDbConnection CreateConnection();
    }
}