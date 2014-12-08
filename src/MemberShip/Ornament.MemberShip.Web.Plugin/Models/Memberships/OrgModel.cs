using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip.Web.Plugin.Models.Memberships
{
    public class OrgDto
    {
        public OrgDto()
        {
            Hide = true;
        }
        private IList<OrgDto> _childs;
        public string Name { get; set; }
        public string Id { get; set; }
        public bool Hide { get; set; }
        public IList<OrgDto> Childs
        {
            get { return _childs ?? (_childs = new List<OrgDto>()); }
            set { _childs = value; }
        }

        public static IList<OrgDto> ToTree(IEnumerable<Org> orgs)
        {
            var result = new List<OrgDto>();
            foreach (var org in orgs)
            {
                var firstLevel = Make(org);
                firstLevel.Hide = true;
                result.Add(firstLevel);
            }
            return result;
        }

        private static OrgDto Make(Org org)
        {
            var result = new OrgDto()
            {
                Name = org.Name,Id=org.Id
            };


            foreach (var child in org.Childs)
            {
                var childDTO = new OrgDto()
                {
                    Name = child.Name,
                    Id = child.Id
                    
                };
                result.Childs.Add(childDTO);

                if (child.Childs.Count != 0)
                {
                    childDTO.Childs.Add(Make(child));
                }
            }
            return result;
        }
    }

    public class OrgModel
    {
        private readonly Org _org;
        private Org _parent;

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
            ParentId = org.Parent.Id;
        }
        /// <summary>
        /// 
        /// </summary>
        public Org Parent
        {
            get
            {
                if (_parent == null)
                {
                    if (!String.IsNullOrEmpty(ParentId) && ParentId.Length == 32)
                    {
                        _parent = OrnamentContext.DaoFactory.GetDaoFactory<IMemberShipDaoFactory>()
                            .CreateOrgDao().Get(ParentId);
                    }
                }
                return _parent;
            }
            set
            {
                _parent = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ParentId { get; set; }
        /// <summary>
        /// </summary>
        [Display(Name = "Role", ResourceType = typeof(Resources))]
        public Role[] Roles { get; set; }

        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof(Ornament.Properties.Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof(Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof(Resources))]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof(Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof(Resources)), UIHint("Textarea")]
        public string Remark { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="dao"></param>
        /// <exception cref="ArgumentNullException">dao is null.</exception>
        public Org Save(IOrgDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");
            Org org = !String.IsNullOrEmpty(Id) ? dao.Get(Id) : new Org(Name);
            org.Name = Name;
            org.Remarks = Remark;
            org.Roles.Clear();
            if (Roles != null)
            {
                foreach (var role in Roles)
                {
                    org.Roles.Add(role);
                }
            }
            dao.SaveOrUpdate(org);
            dao.Flush();
            if (Parent != null)
            {
                IOrgCollection list = Parent.Childs;
                list.Add(org);
                dao.SaveOrUpdate(Parent);
            }
            return org;
        }
    }
}