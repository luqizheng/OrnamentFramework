using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Defects.DefectOperators
{
    public class PendingStatusInvoker:DefectInvoker
    {
        public PendingStatusInvoker(User user, Project project) : base(user, project)
        {
        }

        protected override DefectStatus MatchDefectStatus
        {
            get { return DefectStatus.Pending; }
        }

        protected override DefectOperator[] TesterOperator()
        {
            throw new System.NotImplementedException();
        }

        protected override DefectOperator[] DeveloperOperator()
        {
            throw new System.NotImplementedException();
        }

        protected override DefectOperator[] TestManagerOperator()
        {
            throw new System.NotImplementedException();
        }

        protected override DefectOperator[] DevelopManagerOperator()
        {
            throw new System.NotImplementedException();
        }
    }
}