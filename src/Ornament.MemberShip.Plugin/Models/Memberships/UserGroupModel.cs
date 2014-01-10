using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class UserGroupModel
    {
        public UserGroupModel()
        {
        }

        public UserGroupModel(UserGroup ug)
        {
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
        [Display(Name = "Role", ResourceType = typeof (Resources))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof (ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("string")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (Resources)),
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