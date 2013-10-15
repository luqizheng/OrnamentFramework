using System;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.CRM
{
    public class ShopMemo : DomainObject<ShopMemo, string>
    {
        public ShopMemo()
        {
            CreateTime = DateTime.Now;
        }

        /// <summary>
        ///     Gets or sets the Content of the shop memo
        /// </summary>
        [Required, MaxLength(5000)]
        public virtual string Content { get; set; }


        public virtual DateTime? CreateTime { get; protected set; }

        [Required]
        public virtual Shop Shop { get; set; }
    }
}