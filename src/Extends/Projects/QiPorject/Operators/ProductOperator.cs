using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QiProject.Operators
{
    public enum ProductOperator
    {
        /// <summary>
        /// 
        /// </summary>
        None = 0,
        /// <summary>
        /// 
        /// </summary>
        Read = 1,
        /// <summary>
        /// 
        /// </summary>
        Create = 2 | ProductOperator.Read,
        /// <summary>
        /// 
        /// </summary>
        Delete = 4 | ProductOperator.Create,
    }
}
