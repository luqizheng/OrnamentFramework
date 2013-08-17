using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.Web;
using Qi;
using QiProject;
using QiProject.Dao;

namespace Ornament.MVCWebFrame.Areas.Projects.Models
{
    public class ProjectModel
    {
        [Display(Name = "Project Name"), Required(ErrorMessage = "Please input Project's name")]
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Tester"), Required(ErrorMessage = "Please input tester member")]
        public IPerformer[] Testers { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Developer"), Required(ErrorMessage = "Please input developers member")]
        public IPerformer[] Developers { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Product Product { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Developing Manager"), Required(ErrorMessage = "Please input DeveloperManager member")]
        public IPerformer[] DeveloperManager { get; set; }

        /// <summary>
        /// /
        /// </summary>
        [Display(Name = "Test Manager"), Required(ErrorMessage = "Please input TesterManager member")]
        public IPerformer[] TesterManager { get; set; }

        /// <summary>
        /// /
        /// </summary>
        [Display(Name = "Project Manager"), Required(ErrorMessage = "Please input ProjectManager member")]
        public IPerformer[] ProjectManager { get; set; }

        public void Create(IProjectDao dao)
        {
            var p = new Project(Product)
                {
                    Name = Name,
                };
            dao.SaveOrUpdate(p);
            var _roleDao = OrnamentContext.Current.MemberShipFactory().CreateRoleDao();
            var addMethod = new VoidFunc<IPerformer[], Role>((performers, role) =>
                {
                    _roleDao.SaveOrUpdate(role);
                    _roleDao.Flush();
                    foreach (IPerformer performer in performers)
                    {
                        var member = (IMember)performer;
                        member.AddRole(role);
                    }
                });
            addMethod(Testers, p.Tester);
            addMethod(Developers, p.Developer);
            addMethod(TesterManager, p.TestManager);
            addMethod(DeveloperManager, p.DeveloperManager);


        }
    }
}