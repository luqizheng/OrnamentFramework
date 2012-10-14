using System;
using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Qi.Domain;
using QiProject.Languages;

namespace QiProject.Defects
{
    public class Defect : DomainObject<Defect, string>
    {
        private DateTime _defectDateTime;
        private ISet<Project> _duplicateProjects;

        public Defect()
        {
            Description = "<h4>setps</h4><h4>except result</h4><h4>actual result:</h4>";
        }

        [Display(Name = "DefectId")]
        public virtual int DefectId { get; set; }

        [Display(Name = "Summary")]
        public virtual string Summary { get; set; }

        [Display(Name = "Description")]
        public virtual string Description { get; set; }

        [Display(Name = "Performer")]
        public virtual User Performer { get; set; }

        [Display(Name = "Priority")]
        public virtual DefectPriority Priority { get; set; }

        [Display(ResourceType = typeof (ProjectsCommon), Name = "Reproducible")]
        public virtual bool Reproducible { get; set; }

        /// <summary>
        /// Project those found in project
        /// </summary>
        [Display(Name = "Projects")]
        public virtual ISet<Project> DuplicateProjects
        {
            get { return _duplicateProjects ?? (_duplicateProjects = new HashedSet<Project>()); }
        }

        /// <summary>
        /// Which project found this Owener
        /// </summary>
        [Display(Name = "Owner")]
        public virtual Project Owener { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "UpdateTime")]
        public virtual DateTime UpdateTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Detecter")]
        public virtual User Detecter { get; set; }


        [Display(Name = "Dectect date")]
        public virtual DateTime DefectDateTime
        {
            get
            {
                if (_defectDateTime == DateTime.MinValue)
                {
                    _defectDateTime = DateTime.Now;
                }

                return _defectDateTime;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Status")]
        public virtual DefectStatus Status { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Component")]
        public virtual Component Component { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public virtual Defect CopyTo(Project project)
        {
            var result = new Defect
                {
                    Component = Component,
                    _defectDateTime = DefectDateTime,
                    Description = Description,
                    Detecter = Detecter,
                    Owener = project,
                    Performer = Performer,
                    Priority = Priority,
                    Reproducible = Reproducible,
                    Status = Status,
                    Summary = Summary,
                };
            result.DuplicateProjects.Add(Owener);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="comment"></param>
        public virtual void Reject(User user, string comment)
        {
            if (Status != DefectStatus.New && Status != DefectStatus.Open)
            {
                throw new Exception();
            }

            if (user.OneOf(Owener.ProjectManager,
                           Owener.Developer, Owener.DeveloperManager))
            {
                Status = DefectStatus.Rejected;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="comment"></param>
        public virtual void Pending(User user, string comment)
        {
            if (Status != DefectStatus.Fixed && Status != DefectStatus.Renew && Status != DefectStatus.Reopen)
            {
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="asingUser"></param>
        /// <param name="comment"></param>
        public virtual void Assign(User user, User asingUser, string comment)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="comment"></param>
        public virtual void Fix(User user, string comment)
        {
            if (Status != DefectStatus.Open && Status != DefectStatus.Reopen)
            {
                throw new Exception();
            }
            if (user.OneOf(Owener.ProjectManager, Owener.DeveloperManager, Owener.Developer))
            {
                Status = DefectStatus.Fixed;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="comment"></param>
        public virtual void Reopen(User user, string comment)
        {
            if (Status != DefectStatus.Fixed && Status != DefectStatus.Closed)
            {
                throw new Exception();
            }
            if (user.OneOf(Owener.ProjectManager, Owener.DeveloperManager, Owener.Developer))
            {
                Status = DefectStatus.Reopen;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="comment"></param>
        public virtual void Renew(User user, string comment)
        {
            if (Status != DefectStatus.Rejected && Status != DefectStatus.NotDuplicate)
            {
                throw new Exception();
            }
            if (user.OneOf(Owener.ProjectManager,
                           Owener.TestManager, Owener.TestManager))
            {
                Status = DefectStatus.Renew;
            }
        }
    }
}