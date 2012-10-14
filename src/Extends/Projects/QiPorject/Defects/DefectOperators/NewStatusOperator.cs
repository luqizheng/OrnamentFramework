using System;using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class NewStatusOperator : DefectInvoker
    {
        public NewStatusOperator(User user, Project project)
            : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { throw new NotImplementedException(); }
        }

        protected override DefectOperator[] TesterOperator()
        {
            throw new Exception("Test can't modify this defect.");
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            throw new Exception("Test can't modify this defect.");
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            return new[]
                {
                    DefectOperator.Open,  //make sure it's a defect and need to fix.
                    DefectOperator.Reject, //it's not a defect.
                    DefectOperator.NotDuplicate,
                };
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            return new[]
                {
                    DefectOperator.Reject,//make sure it's a defect and need to fix.
                    DefectOperator.NotDuplicate, //Can't find any probleam
                    DefectOperator.Fix,// fix it.
                };
        }
    }
}