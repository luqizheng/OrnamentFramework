using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class ReopenStatusInvoker:DefectInvoker
    {
        public ReopenStatusInvoker(User user, Project project) : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.Open;}
        }

        protected override DefectOperator[] TesterOperator()
        {
            throw new NotImplementedException();
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            throw new NotImplementedException();
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            throw new NotImplementedException();
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            throw new NotImplementedException();
        }
    }
}
