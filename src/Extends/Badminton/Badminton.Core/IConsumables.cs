﻿using System;
using System.ComponentModel;
using Badminton.Consumableses;

namespace Badminton
{
    /// <summary>
    ///     消耗品基本类别。需要新增的时候，请使用 Consumables
    /// </summary>
    public interface IConsumables
    {
        /// <summary>
        /// </summary>
        int Id { get; set; }

        /// <summary>
        ///     消耗品型号
        /// </summary>
        [DisplayName("型号")]
        Model Model { get; set; }

        /// <summary>
        ///     余额。消耗品的实际余额
        /// </summary>
        [DisplayName("余额")]
        decimal Balance { get; }

        /// <summary>
        ///     消耗品的管理者。可以是Member 或者是MemberGroup
        /// </summary>
        IOwner Owner { get; }
        /// <summary>
        /// 消耗品的创建时间。 
        /// </summary>
        DateTime CreateTime { get; }
    }
}