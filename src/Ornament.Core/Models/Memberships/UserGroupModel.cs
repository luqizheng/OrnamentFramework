using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships
{
    public class UserGroupModel
    {
        public UserGroupModel()
        {

        }

        public string Id { get; set; }

        public UserGroupModel(UserGroup ug)
        {
            this.Id = ug.Id;
            this.Name = ug.Name;
            this.Remark = ug.Remark;
        }
        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof(MemberShipModel))]
        public Role[] Roles { get; set; }
        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof(MemberShipModel)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof(ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof(ErrorMessage)), UIHint("string")]
        public string Name { get; set; }
        [Display(Name = "Remark", ResourceType = typeof(MemberShipModel)),
        RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
            ErrorMessageResourceType = typeof(ErrorMessage)), UIHint("Textarea")]
        public string Remark { get; set; }

        public void Save(Ornament.MemberShip.Dao.IUserGroupDao dao)
        {
            var id = this.Id.Trim();
            var ug = dao.Get(id);
            ug.Name = Name;
            ug.Remark = Remark;
            dao.SaveOrUpdate(ug);
        }

    }
}
