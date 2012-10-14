using System;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    /// <summary>
    /// The Defect is fix stauts
    /// </summary>
    public class FixStatusOperator : DefectInvoker
    {
        public FixStatusOperator(User user, Project project)
            : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.Fixed; }
        }

        protected override DefectOperator[] TesterOperator()
        {
            return new[]
                {
                    DefectOperator.Reopen, // tester could reopen this defect, developer think it fix well, but not.
                    DefectOperator.Close,  //developer fix it, and teser can't find any issus.
                };
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            throw new NotImplementedException();
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            return new[]
                {
                    DefectOperator.Reopen, // tester could reopen this defect, developer think it fix well, but not.
                    DefectOperator.Close, //developer fix it, and teser can't find any issus.
                };
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            return new[]
                {
                    DefectOperator.Open
                };
        }
    }
}