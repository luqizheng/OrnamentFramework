using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip
{
    [Serializable]
    public class Role : Performer<Role>
    {
        

        private Iesi.Collections.Generic.ISet<Permission> _permissions;
        private string _remark;

        public Role()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <exception cref="ArgumentNullException">roleName is null or length is 0</exception>
        public  Role(string roleName)
        {
            if (String.IsNullOrWhiteSpace(roleName))
                throw new ArgumentNullException("roleName");
            Name = roleName;
        }


        /// <summary>
        ///     Gets or sets remark
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (Resources))]
        [StringLength(100, ErrorMessageResourceType = typeof (ErrorMessage),
            ErrorMessageResourceName = "RoleRemarkOverMaxLength")]
        public virtual string Remark
        {
            get { return _remark; }
            set
            {
                if (!String.IsNullOrEmpty(value))
                {
                    if (value.Length > 100)
                    {
                        throw new ArgumentOutOfRangeException("value", value.Length,
                                                              "Comment 's length should be less than 100");
                    }
                    _remark = value;
                }
            }
        }

        public virtual Iesi.Collections.Generic.ISet<Permission> Permissions
        {
            get { return _permissions ?? (_permissions = new HashedSet<Permission>()); }
        }

     

        #region IPerformer Members

        public override IEnumerable<Role> GetAllRoles()
        {
            return Roles;
        }

        #endregion

        protected override PerformerType GetPerformerType()
        {
            return PerformerType.Role;
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return memberShipFactory.CreateUserDao().GetUsersInRole(Name);
        }
    }
}