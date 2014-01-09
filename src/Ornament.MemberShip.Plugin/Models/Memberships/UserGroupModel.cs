using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class UserGroupModel
    {
        private readonly UserGroup _ug;

        public UserGroupModel()
        {
        }

        public UserGroupModel(UserGroup ug)
        {
            _ug = ug;
            Id = ug.Id;
            Name = ug.Name;
            Remark = ug.Remarks;
            Roles = ug.GetAllRoles().ToArray();
        }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof(Properties.Resources))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof(Properties.Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof (ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("string")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof(Properties.Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("Textarea")]
        public string Remark { get; set; }

        public void Save(IUserGroupDao dao)
        {
            string id = Id.Trim();
            UserGroup ug = dao.Get(id);
            ug.Name = Name;
            ug.Remarks = Remark;
            dao.SaveOrUpdate(ug);
        }
    }
}