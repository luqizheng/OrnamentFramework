using System;
using Qi.Domain;

namespace Qi.CRM
{
    public class ShopMemo : DomainObject<ShopMemo, string>
    {
        public ShopMemo()
        {
            CreateTime = DateTime.Now;
        }

        public virtual string Content { get; set; }
        public virtual DateTime? CreateTime { get; set; }

        public virtual Shop Shop { get; set; }
    }
}