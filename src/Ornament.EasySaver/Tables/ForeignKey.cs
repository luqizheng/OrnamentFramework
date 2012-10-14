using System;

namespace Ornament.EasySqlExecuter.Tables
{
    public class ForeignKey : Column
    {
        public ForeignKey(string columnName)
        {
            this.Name = columnName;
           
        }
        /// <summary>
        /// 
        /// </summary>
        public Type IdType { get; set; }



    }
}