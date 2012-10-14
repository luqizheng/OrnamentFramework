using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class OpenStatusInvoker : DefectInvoker
    {
        public OpenStatusInvoker(User user, Project project)
            : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.Open; }
        }


        protected override DefectOperator[] TesterOperator()
        {
            throw new NotImplementedException("pls throw customer exception, tester can't change this defect.");
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            return new[]
                {
                    DefectOperator.Fix,
                    DefectOperator.NotDuplicate,
                    
                };
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
