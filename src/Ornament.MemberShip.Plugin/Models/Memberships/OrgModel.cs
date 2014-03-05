using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class OrgModel
    {
        private readonly Org _org;

        public OrgModel()
        {
        }

        public OrgModel(Org org)
        {
            _org = org;
            Id = org.Id;
            Name = org.Name;
            Remark = org.Remarks;
            Roles = org.GetAllRoles().ToArray();
            Parent = org.Parent;
        }

        public Org Parent { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Role", ResourceType = typeof (Resources))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (Ornament.Properties.Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof(Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof(Resources)), UIHint("string")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof(Resources)), UIHint("Textarea")]
        public string Remark { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="dao"></param>
        /// <exception cref="ArgumentNullException">dao is null.</exception>
        public void Save(IOrgDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");
            Org ug = !String.IsNullOrEmpty(Id) ? dao.Get(Id) : new Org(Name);
            ug.Name = Name;
            ug.Remarks = Remark;
            dao.SaveOrUpdate(ug);
            dao.Flush();
            if (Parent != null)
            {
                IOrgCollection list = Parent.Childs;
                list.Add(ug);
                dao.SaveOrUpdate(Parent);
            }
        }
    }
}