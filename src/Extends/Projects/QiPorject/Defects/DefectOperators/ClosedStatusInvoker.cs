using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class ClosedStatusInvoker:DefectInvoker
    {
        public ClosedStatusInvoker(User user, Project project) : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.Closed;}
        }

        protected override DefectOperator[] TesterOperator()
        {
            return new DefectOperator[]
                {
                   DefectOperator.Reopen
                };
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            throw new NotImplementedException();
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            return new DefectOperator[]
                {
                    DefectOperator.Reopen
                };
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            throw new NotImplementedException();
        }
    }
}
