using System.Collections.Generic;
using System.Data;
using Ornament.EasySqlExecuter.Tables;

namespace Ornament.EasySqlExecuter.Drivers
{
    public delegate void ExecuteReaderHandler(IDataReader dataReader);
    public interface IDriver
    {
        /// <summary>
        /// 
        /// </summary>
        IDbConnection Connection { get; }
        /// <summary>
        /// 
        /// </summary>
        bool Transcations { get; set; }
        /// <summary>
        /// 
        /// </summary>
        DatabaseType DatabaseType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IDbConnection Open();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="hasError"></param>
        void Close(bool hasError);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="valueParameters"></param>
        /// <returns></returns>
        List<object> ExecuteScalar(string sql, IList<DbParameter> valueParameters);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="noValueParameters"></param>
        /// <returns></returns>
        IList<int> ExecuteNonQuery(string sql, IList<DbParameter> noValueParameters);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="dataParameters"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        void ExecuteReader(string sql, IList<DbParameter> dataParameters, ExecuteReaderHandler readerHandler);
    }
}