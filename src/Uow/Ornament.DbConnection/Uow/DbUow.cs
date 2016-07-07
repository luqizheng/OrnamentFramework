using System;
using System.Collections.Generic;
using System.Data;
using Ornament.Domain.Uow;

namespace Ornament.DbConnection.Uow
{
    public class DbUow : IUnitOfWork
    {
        private readonly IDbConnection _connection;
        private readonly bool _isTranscation;
        private readonly IConnectionProvider _provider;
        private IDbTransaction _dbTransaction;
        private IDbCommand _parameterCreator;

        public DbUow(IConnectionProvider provider, bool isTranscation)
        {
            _connection = provider.CreateConnection();
            _provider = provider;
            _isTranscation = isTranscation;
        }

        public IsolationLevel? IsolationLevel { get; set; }

        public void Dispose()
        {
            if (_connection.State != ConnectionState.Closed)
            {
                _connection.Close();
            }
        }

        public void Begin()
        {
            _connection.Open();
            if (!_isTranscation) return;
            if (IsolationLevel != null)
                _dbTransaction = _connection.BeginTransaction(IsolationLevel.Value);
            _dbTransaction = _connection.BeginTransaction();
        }

        public void Rollback()
        {
            _dbTransaction?.Rollback();
        }

        public void Commit()
        {
            _dbTransaction?.Commit();
        }

        public void Close()
        {
            _connection.Close();
        }

        public int ExecuteNonQuery(string sql, IEnumerable<IDbDataParameter> parameters,
            CommandType commandType = CommandType.StoredProcedure)
        {
            if (sql == null) throw new ArgumentNullException(nameof(sql));
            if (parameters == null) throw new ArgumentNullException(nameof(parameters));
            var comm = BuildCommand(sql, commandType, parameters);
            return comm.ExecuteNonQuery();
        }

        public int ExecuteNonQuery(string sql)
        {
            if (sql == null) throw new ArgumentNullException(nameof(sql));
            var comm = BuildCommand(sql, CommandType.Text, null);
            return comm.ExecuteNonQuery();
        }

        public IDataReader ExecuteReader(string sql, IEnumerable<IDbDataParameter> parameters,
            CommandType commandType = CommandType.StoredProcedure)
        {
            if (sql == null) throw new ArgumentNullException(nameof(sql));
            if (parameters == null) throw new ArgumentNullException(nameof(parameters));
            var comm = BuildCommand(sql, commandType, parameters);
            return comm.ExecuteReader();
        }

        public IDataReader ExecuteReader(string sql)
        {
            if (sql == null) throw new ArgumentNullException(nameof(sql));
            var comm = BuildCommand(sql, CommandType.Text, null);
            return comm.ExecuteReader();
        }

        private IDbCommand BuildCommand(string sql, CommandType commandType, IEnumerable<IDbDataParameter> parameters)
        {
            var comm = _connection.CreateCommand();
            comm.CommandText = sql;
            comm.CommandType = commandType;

            if (parameters == null)
                return comm;

            foreach (var parameter in parameters)
            {
                comm.Parameters.Add(parameter);
            }
            return comm;
        }

        /// <summary>
        /// </summary>
        /// <param name="name">Parameter Name</param>
        /// <param name="value"></param>
        /// <returns></returns>
        public IDbDataParameter CreateParameter(string name, object value)
        {
            if (_parameterCreator == null)
                _parameterCreator = _connection.CreateCommand();

            var result = _parameterCreator.CreateParameter();
            result.ParameterName = _provider.ParameterPrefix + name;
            result.Value = value;
            return result;
        }
    }
}