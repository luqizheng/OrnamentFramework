using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using NPOI.SS.UserModel;

namespace Ornament.Files.Excels
{
    /// <summary>
    /// Excel每行的处理函数
    /// </summary>
    public interface IRowProcess
    {
        /// <summary>
        ///     是否整批导入，如果true，那么只有全部正确的才导入。false就是每条到执行导入。
        /// </summary>
        bool Process(ICell[] cells, out List<ValidationResult> errorMessages);
    }
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class RowProcessBase<T> : IRowProcess
    {
        public bool Process(ICell[] cells, out List<ValidationResult> errorMessages)
        {
            errorMessages = new List<ValidationResult>();
            T resultObj = CreateObject(cells);
            var context = new ValidationContext(resultObj, null, null);
            bool result = Validator.TryValidateObject(resultObj, context, errorMessages);
            return result;
        }

        public abstract T CreateObject(ICell[] cells);
    }
}