using System;
using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships
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
            Remark = ug.Remark;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof (MemberShipModel))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (MemberShipModel)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof (ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("string")]
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (MemberShipModel)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("Textarea")]
        public string Remark { get; set; }

        public void Save(IUserGroupDao dao)
        {
            string id = Id.Trim();
            UserGroup ug = dao.Get(id);
            ug.Name = Name;
            ug.Remark = Remark;
            dao.SaveOrUpdate(ug);
        }
    }
}