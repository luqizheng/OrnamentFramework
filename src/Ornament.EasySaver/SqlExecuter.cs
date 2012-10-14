// --------------------------------------------------------------------------------------------------------------------
// <copyright file="SqlExecuter.cs" company="">
//   
// </copyright>
// <summary>
//   sql executer.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Data;
using Ornament.EasySqlExecuter.Drivers;

namespace Ornament.EasySqlExecuter
{

    #region

    #endregion

    /// <summary>
    /// sql executer.
    /// </summary>
    public sealed class SqlExecuter
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlExecuter"/> class.
        /// </summary>
        /// <param name="Driver">
        /// The driver.
        /// </param>
        public SqlExecuter(IDriver Driver)
        {
            this.Driver = Driver;
        }

        /// <summary>
        /// Gets Driver.
        /// </summary>
        public IDriver Driver { get; private set; }

        /// <summary>
        /// execute scalar.
        /// </summary>
        /// <param name="sql">
        /// The sql.
        /// </param>
        /// <param name="noValueParameters">
        /// The no value parameters.
        /// </param>
        /// <param name="valuesList">
        /// The values list.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentException">
        /// </exception>
        public List<object> ExecuteScalar(
            string sql, IList<IDataParameter> noValueParameters, DataValueSetCollection valuesList)
        {
            var result = new List<object>();
            try
            {
                IDbCommand command = Create(sql, noValueParameters);
                foreach (RowDataValue objects in valuesList)
                {
                    for (int i = 0; i < noValueParameters.Count; i++)
                    {
                        IDataParameter para = noValueParameters[i];
                        para.Value = objects[i].Value;
                    }

                    result.Add(command.ExecuteScalar());
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(sql, ex);
            }
        }

        /// <summary>
        /// execute non query.
        /// </summary>
        /// <param name="sql">
        /// The sql.
        /// </param>
        /// <param name="noValueParameters">
        /// The no value parameters.
        /// </param>
        /// <param name="valuesList">
        /// The values list.
        /// </param>
        /// <exception cref="ArgumentException">
        /// </exception>
        public void ExecuteNonQuery(string sql, IList<IDataParameter> noValueParameters,
                                    DataValueSetCollection valuesList)
        {
            try
            {
                IDbCommand command = Create(sql, noValueParameters);
                foreach (RowDataValue valueSet in valuesList)
                {
                    for (int i = 0; i < noValueParameters.Count; i++)
                    {
                        noValueParameters[i].Value = valueSet[i].Value;
                    }

                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(sql, ex);
            }
        }

        /// <summary>
        /// execute non query.
        /// </summary>
        /// <param name="sql">
        /// The sql.
        /// </param>
        /// <exception cref="ArgumentException">
        /// </exception>
        public void ExecuteNonQuery(string sql)
        {
            IDbCommand command = CreateCommand(sql);
            try
            {
                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(sql, ex);
            }
        }

     

        public IDataReader ExecuteReader(string sql, List<IDataParameter> dataParameters,
                                         DataValueSetCollection valuelist)
        {
            IDbCommand command = Driver.CreateCommand(sql);
            try
            {
                RowDataValue value = valuelist[0];

                for (int i = 0; i < dataParameters.Count; i++)
                {
                    IDataParameter parameter = dataParameters[i];
                    parameter.Value = value[0].Value;
                    command.Parameters.Add(parameter);
                }

                return command.ExecuteReader();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(sql, ex);
            }
        }

        public IDataReader ExecuteReader(string sql)
        {
            IDbCommand command = Driver.CreateCommand(sql);
            try
            {
                return command.ExecuteReader();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(sql, ex);
            }
        }


        /// <summary>
        /// create parameter.
        /// </summary>
        /// <param name="parameterName">
        /// The parameter name.
        /// </param>
        /// <returns>
        /// </returns>
        public IDbDataParameter CreateParameter(string parameterName)
        {
            return Driver.CreateParameter(parameterName);
        }

        /// <summary>
        /// close.
        /// </summary>
        public void Close(bool hasError)
        {
            Driver.Close(hasError);
        }

        /// <summary>
        /// open.
        /// </summary>
        public void Open()
        {
            Driver.Open();
        }

        #region create command

        /// <summary>
        /// create.
        /// </summary>
        /// <param name="sql">
        /// The sql.
        /// </param>
        /// <param name="datas">
        /// The datas.
        /// </param>
        /// <returns>
        /// </returns>
        private IDbCommand Create(string sql, IEnumerable<IDataParameter> datas)
        {
            IDbCommand result = Driver.CreateCommand(sql);
            foreach (IDataParameter a in datas)
            {
                result.Parameters.Add(a);
            }

            return result;
        }

        #endregion
    }
}