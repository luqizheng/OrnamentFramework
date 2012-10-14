using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Permissions;
using Qi.Domain;
using QiProject.Dao;
using QiProject.Defects;
using QiProject.Operators;

namespace QiProject
{
    public class Project : DomainObject<Project, int>
    {
        private readonly Iesi.Collections.Generic.ISet<GenericPermission<Project>> _permissions;
        private DateTime _createTime;

        protected Project()
        {
        }

        public Project(Product product)
        {
            Product = product;

            DefectOperator allOperator =
                Enum.GetValues(typeof (DefectOperator)).Cast<DefectOperator>().Aggregate(DefectOperator.None,
                                                                                         (current, genericPermission) =>
                                                                                         (current | genericPermission));
            var projectManagerPermission = new GenericPermission<Project>(this)
                {
                    Name = "Project Manager Defect Permission",
                    Remark = "Project Manager, God of pojrect",
                    Operator = Convert.ToInt32(allOperator)
                };
            var tester = new GenericPermission<Project>(this) //Tester
                {
                    Name = "Tester",
                    Remark = "Tester for this prject, reopen or create new Defect.",
                    Operator =
                        Convert.ToInt32(DefectOperator.Close | DefectOperator.CreateDefect | DefectOperator.Reopen)
                };
            var testerManager = new GenericPermission<Project>(this) //Test admin
                {
                    Name = "Defect Manager",
                    Remark =
                        "Defect Manager Renew defect or open a Fixed status defecth,",
                    Operator = tester.Operator | Convert.ToInt32(DefectOperator.Renew)
                };
            var developer = new GenericPermission<Project>(this)
                {
                    Name = "Developer", //developer
                    Remark = "developer for this project,reop",
                    Operator =
                        Convert.ToInt32(DefectOperator.Fix | DefectOperator.NotDuplicate | DefectOperator.Reject |
                                        DefectOperator.Remind | DefectOperator.Pending)
                };
            var developerManager = new GenericPermission<Project>(this) //Develop Admin
                {
                    Name = "Develop admin",
                    Remark = "admin developers,could pending,reject defect.",
                    Operator = developer.Operator | Convert.ToInt32(DefectOperator.Open)
                };
            _permissions = new HashedSet<GenericPermission<Project>>
                {
                    projectManagerPermission,
                    tester,
                    testerManager,
                    developer,
                    developerManager,
                };

            ProjectManager = new Role("Project Manager");
            ProjectManager.Permissions.Add(projectManagerPermission);

            TestManager = new Role("Test Manager");
            TestManager.Permissions.Add(testerManager);

            Tester = new Role("Tester");
            Tester.Permissions.Add(tester);

            DeveloperManager = new Role("Developer Manager");
            DeveloperManager.Permissions.Add(developerManager);

            Developer = new Role("Developer");
            Developer.Permissions.Add(developer);
        }

        public virtual Role ProjectManager { get; set; }
        public virtual Role TestManager { get; set; }
        public virtual Role DeveloperManager { get; set; }
        public virtual Role Tester { get; set; }
        public virtual Role Developer { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual ProjectStatus Status { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual string Name { get; set; }

        public virtual Product Product { get; set; }

        public virtual DateTime CreateTime
        {
            get
            {
                if (_createTime == DateTime.MinValue)
                    _createTime = DateTime.Now;
                return _createTime;
            }
        }

        public virtual ReadOnlyCollection<GenericPermission<Project>> Permissions
        {
            get
            {
                return
                    new ReadOnlyCollection<GenericPermission<Project>>(new List<GenericPermission<Project>>(Permissions));
            }
        }

        /// <summary>
        /// Create new project from this project,it's inherit all defeat
        /// </summary>
        /// <remarks>
        /// 
        /// </remarks>
        /// <returns>new project instance</returns>
        public virtual Project ImportToNewProject(IProjectDaoFactory daoFactory)
        {
            IDefectDao defectDao = daoFactory.DefectDao;

            var re = new Project(Product);
            IList<Defect> allDefects = daoFactory.DefectDao.GetDefects(this,
                                                                       new[]
                                                                           {
                                                                               DefectStatus.Open, DefectStatus.Pending,
                                                                               DefectStatus.Reopen, DefectStatus.New
                                                                           });

            int i = 1;
            foreach (Defect defect in allDefects)
            {
                Defect newDefect = defect.CopyTo(re);
                newDefect.DefectId = i;
                defectDao.SaveOrUpdate(defect);
                i++;
            }
            return re;
        }

        public override string ToString()
        {
            return Name;
        }

        public virtual DefectStatus[] GetDefectStatus(User user)
        {
            var result = new HashedSet<DefectStatus>();
            bool foundTestManager = false, foundTester = false, foundDeveloper = false, foundDevelopeManager = false;
            var handler = new Func<Role, bool>(matchRole =>
                {
                    if (matchRole == ProjectManager)
                    {
                        foreach (DefectStatus a in Enum.GetValues(typeof (DefectStatus)))
                        {
                            result.Add(a);
                        }
                        return false;
                    }
                    if (matchRole == Tester)
                    {
                        foundTester = true;
                        result.AddAll(new[]
                            {
                                DefectStatus.New,
                                DefectStatus.Closed,
                                DefectStatus.Reopen,
                            });
                    }
                    else if (matchRole == TestManager)
                    {
                        foundTestManager = true;
                        result.AddAll(new[]
                            {
                                DefectStatus.New,
                                DefectStatus.Closed,
                                DefectStatus.Reopen,
                                DefectStatus.Renew,
                            });
                    }
                    else if (matchRole == Developer)
                    {
                        foundDeveloper = true;
                        result.AddAll(new[]
                            {
                                DefectStatus.Fixed,
                                DefectStatus.NotDuplicate,
                            });
                    }
                    else if (matchRole == DeveloperManager)
                    {
                        foundDevelopeManager = true;
                        result.AddAll(new[]
                            {
                                DefectStatus.Fixed,
                                DefectStatus.NotDuplicate,
                                DefectStatus.Pending,
                                DefectStatus.Rejected,
                            });
                    }


                    if (foundTestManager && foundDevelopeManager && foundTester && foundDeveloper)
                    {
                        return false;
                    }
                    return true;
                });

            user.OneOf(new[] {ProjectManager, TestManager, Tester, Developer, DeveloperManager}, handler);
            return result.ToArray();
        }
    }

    public enum ProjectStatus
    {
        Open,
        Closed,
    }
}