using System;

namespace Ornament.EasySqlExecuter
{
    public class ForeignKey
    {
        private readonly string fieldName;
        private DataValue[] values;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="fieldName"></param>
        public ForeignKey(string fieldName)
        {
            this.fieldName = fieldName;
        }

        /// <summary>
        /// 
        /// </summary>
        internal DataValue[] Values
        {
            get { return values; }
            set { values = value; }
        }

        /// <summary>
        /// 外键所在的数据表。
        /// </summary>
        public ExecuteItem ExecuteItem { get; internal set; }

        /// <summary>
        /// 
        /// </summary>
        public Type IdType { get; set; }

        /// <summary>
        /// gets value indecate field name in database.
        /// </summary>
        public string FieldName
        {
            get { return fieldName; }
        }
    }
}