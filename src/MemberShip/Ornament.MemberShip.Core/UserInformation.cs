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
                CreateTime = DateTime.Now;
            }

            /// <summary>
            ///     ��ȡ�û�����ʱ��
            /// </summary>
            [Display(Name = "CreateTime", ResourceType = typeof (Resources))]
            public virtual DateTime CreateTime { get; protected internal set; }


            /// <summary>
            ///     ��ȡ���趨�û�����Ծʱ��
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