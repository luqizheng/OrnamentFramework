using System.Data;

namespace Ornament.DbConnection
{
    public interface IConnectionProvider
    {
        
        IDbConnection CreateConnection();
    }
}