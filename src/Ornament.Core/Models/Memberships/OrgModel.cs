using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships
{
    public class OrgModel
    {
        public OrgModel()
        {
        }

        public OrgModel(Org org)
        {
            Id = org.Id;
            Name = org.Name;
            Remark = org.Remark;
            Roles = org.GetAllRoles().ToArray();
        }

        public string ParentId { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof (MemberShipModel))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (MemberShipModel)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof (ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("string")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (MemberShipModel)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage)), UIHint("Textarea")]
        public string Remark { get; set; }

        public void Save(IOrgDao dao)
        {
            string id = Id.Trim();
            Org ug = dao.Get(id);
            ug.Name = Name;
            ug.Remark = Remark;
            var parent = dao.Get(this.ParentId);
            parent.Add(ug);
            dao.SaveOrUpdate(ug);
        }
    }
}