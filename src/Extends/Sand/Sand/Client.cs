using System;
using Qi.Domain;

namespace Sand
{
    public class Client : DomainObject<Client, string>
    {
        protected Client()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="code"></param>
        public Client(ClientModel model, string code)
        {
            if (model == null) throw new ArgumentNullException("model");
            if (!String.IsNullOrEmpty(code))
                throw new ArgumentNullException("code");
            Model = model;
            Code = code;
        }
        /// <summary>
        /// 
        /// </summary>
        public virtual ClientModel Model { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual string Code { get; set; }
    }
}