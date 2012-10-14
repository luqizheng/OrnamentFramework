using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QiProject.Operators
{
    [Flags]
    public enum DefectOperator
    {
        None = 0,
        /// <summary>
        /// Read the Defect
        /// </summary>
        Read = 1,
        /// <summary>
        /// Inlcude OpenStatusInvoker, Reopen,Closed
        /// </summary>
        CreateDefect = 2 | DefectOperator.Read,
        /// <summary>
        /// Reject this defect.
        /// </summary>
        Reject = 4 | DefectOperator.Read,
        /// <summary>
        /// It's a defect and assing to some people
        /// </summary>
        Open = 8 | DefectOperator.Read,
        /// <summary>
        /// Reopen this defecht which is reject or notDuplicate 
        /// </summary>
        Reopen = 16 | DefectOperator.Read,
        /// <summary>
        /// Not fix well.
        /// </summary>
        Renew = 32 | DefectOperator.Read,
        /// <summary>
        /// Fix this defect.
        /// </summary>
        Fix = 64 | DefectOperator.Read,
        /// <summary>
        /// Close the defect. it is fix
        /// </summary>
        Close = 128 | DefectOperator.Read,
        /// <summary>
        /// Can't duplicate more.
        /// </summary>
        NotDuplicate = 256 | DefectOperator.Read,

        /// <summary>
        /// Because desing are changed, can't find defect again.
        /// 
        /// </summary>
        Remind = 512 | DefectOperator.Read,
        /// <summary>
        /// Fix it in next version.
        /// </summary>
        Pending = 1024 | DefectOperator.Read,



    }
}
