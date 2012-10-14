using System.Collections.Generic;
using Ornament.MemberShip;
using QiProject.Operators;

namespace QiProject.Dao
{
    public interface IProjectDao:Qi.Domain.IDao<int,Project>
    {
        IList<Project> List(User currentUser,DefectOperator @operator);
    }
}