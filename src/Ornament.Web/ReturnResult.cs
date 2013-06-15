using System;
using System.Collections.Generic;
using System.Text;

namespace Ornament.Web
{
    [Serializable]
    public class ReturnResult
    {
        private IDictionary<string, object> _data;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReturnResult"/> class.
        /// <see cref="Success"/> will set to true;
        /// </summary>
        public ReturnResult()
        {
            Success = true;
        }

        /// <summary>
        /// Results the result.
        /// <see cref="Success"/> will set to false.
        /// </summary>
        /// <param name="ex">The exception.</param>
        /// <param name="encodeHtml"></param>
        public ReturnResult(Exception ex, bool encodeHtml)
        {
            Message = ToMessage(ex, encodeHtml);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ReturnResult"/> class.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="success">if set to <c>true</c> [success].</param>
        public ReturnResult(string message, bool success)
        {
            if (message == null) throw new ArgumentNullException("message");
            Message = message;
            Success = success;
        }


        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="ReturnResult"/> is success.
        /// </summary>
        /// <value><c>true</c> if success; otherwise, <c>false</c>.</value>
        public bool Success { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>The message.</value>
        public string Message { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public IDictionary<string, object> Data
        {
            get { return _data ?? (_data = new Dictionary<string, object>()); }
        }

        /// <summary>
        /// Toes the message.
        /// </summary>
        /// <param name="ex">The ex.</param>
        /// <param name="encodeHtml">if set to <c>true</c> [encode HTML].</param>
        /// <returns></returns>
        private static string ToMessage(Exception ex, bool encodeHtml)
        {
            Exception currentException = ex;
            var result = new StringBuilder();
            string enter = encodeHtml ? "<br>" : "\r\n";
            string spliter = encodeHtml ? "<hr>" : "-----------------------------";
            while (currentException != null)
            {
                result.Append(ex.Message).Append(enter)
                    .Append("Trace:").Append(currentException.StackTrace).Append(enter)
                    .Append(spliter);
                currentException = currentException.InnerException;
            }
            return result.ToString();
        }
    }
}