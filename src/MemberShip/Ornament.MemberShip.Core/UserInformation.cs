using System;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public partial class User
    {
        public class OtherUserInfo : DomainObject<OtherUserInfo, string>
        {
            protected internal OtherUserInfo()
            {
            }

            /// <summary>
            ///     获取用户创建时间
            /// </summary>
            [Display(Name = "CreateTime", ResourceType = typeof (Resources))]
            public virtual DateTime CreateTime { get; protected internal set; }


            /// <summary>
            ///     获取用户被锁定的时间
            /// </summary>
            [Display(Name = "LastLockTime", ResourceType = typeof (Resources))]
            public virtual DateTime? LastLockoutDate { get; protected internal set; }

           

            /// <summary>
            ///     获取或设定用户最后活跃时间
            /// </summary>
            [Display(Name = "LastActivityTime", ResourceType = typeof (Resources))]
            public virtual DateTime? LastActivityDate { get; set; }

            /// <summary>
            ///     Gets or sets UpdateTime.
            /// </summary>
            /// <value>
            ///     The update time.
            /// </value>
            [Display(Name = "LastUpdateTime", ResourceType = typeof (Resources))]
            public virtual DateTime? UpdateTime { get; protected internal set; }
        }
    }
}