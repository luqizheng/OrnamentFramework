using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class NotDuplicateStatusInvoker : DefectInvoker
    {
        public NotDuplicateStatusInvoker(User user, Project project)
            : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.NotDuplicate; }
        }

        protected override DefectOperator[] TesterOperator()
        {
            return new[]
                {
                    DefectOperator.Reopen, //It is a defect
                };
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            return new[]
                {
                    DefectOperator.Open, 
                };
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            return new[]
                {
                    DefectOperator.Open, //Test manager 
                };
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            throw new System.NotImplementedException();
        }
    }
}