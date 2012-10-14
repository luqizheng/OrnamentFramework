using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public abstract class DefectInvoker
    {
        private readonly Project _project;
        private readonly User _user;

        protected DefectInvoker(User user, Project project)
        {
            _user = user;
            _project = project;
            Init(project, user);
        }

        protected abstract DefectStatus MatchDefectStatus { get; }

        protected bool IsTester { get; private set; }

        protected bool IsTestManager { get; private set; }

        protected bool IsDeveloper { get; private set; }

        protected bool IsDeveloperManager { get; private set; }

        protected bool IsManager { get; private set; }

        public virtual DefectOperator[] NextOperators(Defect defect)
        {
            if (defect.Status != MatchDefectStatus)
            {
                throw new Exception("dkfjdkjfkd");
            }

            var list = new HashSet<DefectOperator>();
            if (IsTester)
            {
                foreach (DefectOperator a in TesterOperator())
                {
                    list.Add(a);
                }
            }
            if (IsTestManager)
            {
                foreach (DefectOperator a in TestManagerOperator())
                {
                    list.Add(a);
                }
            }

            if (IsDeveloperManager)
            {
                foreach (DefectOperator a in DevelopManagerOperator())
                {
                    list.Add(a);
                }
            }
            if (IsDeveloper)
            {
                foreach (DefectOperator a in DevelopManagerOperator())
                {
                    list.Add(a);
                }
            }
            return list.ToArray();
        }

        //public abstract void Invoke(DefectOperator @operator);

        protected abstract DefectOperator[] TesterOperator();
        protected abstract DefectOperator[] DeveloperOperator();
        protected abstract DefectOperator[] TestManagerOperator();
        protected abstract DefectOperator[] DevelopManagerOperator();

        private void Init(Project owener, User user)
        {
            //too slow,please make faster
            IsManager = user.OneOf(owener.ProjectManager);
            IsDeveloperManager = user.OneOf(owener.DeveloperManager);
            IsDeveloper = user.OneOf(owener.Developer);
            IsTestManager = user.OneOf(owener.TestManager);
            IsTester = user.OneOf(owener.Tester);
        }
    }
}